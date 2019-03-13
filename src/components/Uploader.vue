<template>
    <div>
        <h4>您所选择的文件列表：</h4>
        <div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
        <div v-for="file in files" :id="file.id">{{file.name}}({{formatSize(file.size)}})<b></b>
            <div class="progress">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        </div>
        <br/>

        <div id="container">
            <a id="selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
            <a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
        </div>

        <pre id="console"></pre>

        <p>&nbsp;</p>
    </div>
</template>

<script>
    import plupload from 'plupload'

    export default {
        name: "Uploader",
        data() {
            return {
                uploader: null,
                files: [],

                host: '',
                policy: '',
                accessId: '',
                signature: '',
                dir: '',
                expire: 0,
                g_object_name: '${filename}',
                g_object_name_type: 'local_name',
                callbackbody: null,
                now: null,
                timestamp: null,
            }
        },
        computed: {
            userId() {
                return this.$store.state.userInfo.id;
            },
            serverUrl() {
                return process.env.VUE_APP_PROXY_URL + '/signature';
            }
        },
        methods: {
            formatSize(size) {
                return plupload.formatSize(size);
            },
            getSignature() {
                // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
                this.now = this.timestamp = Date.parse(new Date()) / 1000;
                if (this.expire < this.now + 3) {
                    let body = this.sendRequest()
                    let obj = eval("(" + body + ")");
                    this.host = obj['host']
                    this.policy = obj['policy']
                    this.accessId = obj['accessId']
                    this.signature = obj['signature']
                    this.expire = parseInt(obj['expire'])
                    // this.callbackbody = obj['callback']
                    this.dir = obj['dir']
                    return true;
                }
                return false;
            },
            setUploadParam(uploader, filename, ret) {
                if (ret == false) {
                    ret = this.getSignature();
                }
                this.g_object_name = this.dir;
                if (filename != '') {
                    // let suffix = this.getSuffix(filename);
                    // this.g_object_name += '${filename}';
                    this.g_object_name += new Date().format('yyyyMMddhhmmss') + '_${filename}';
                }
                let new_multipart_params = {
                    'key': this.g_object_name,
                    'policy': this.policy,
                    'OSSAccessKeyId': this.accessId,
                    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                    // 'callback': this.callbackbody,
                    'signature': this.signature,
                };

                uploader.setOption({
                    'url': this.host,
                    'multipart_params': new_multipart_params
                });

                uploader.start();
            },
            sendRequest() {
                let xmlhttp = null;
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (xmlhttp != null) {
                    // serverUrl是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
                    xmlhttp.open("GET", this.serverUrl + encodeURI('?dir=' + this.userId + '/'), false);
                    xmlhttp.send(null);
                    return xmlhttp.responseText
                } else {
                    alert("Your browser does not support XMLHTTP.");
                }
            },
            getSuffix(filename) {
                let pos = filename.lastIndexOf('.')
                let suffix = ''
                if (pos != -1) {
                    suffix = filename.substring(pos)
                }
                return suffix;
            },
            uploaded(file) {
                this.$emit('uploaded', file);
            }
        },
        mounted() {
            let setUploadParam = this.setUploadParam;
            let uploaded = this.uploaded;
            let fs = this.files;
            let uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: 'selectfiles',
                container: document.getElementById('container'),
                flash_swf_url: '/static/plupload/Moxie.swf',
                silverlight_xap_url: '/static/plupload/Moxie.xap',
                url: 'http://oss.aliyuncs.com',

                filters: {
                    mime_types: [
                        {title: 'Image files', extensions: 'jpg,gif,png,bmp'},
                        {title: 'Zip files', extensions: 'zip,rar'},
                    ],
                    max_file_size: '50mb',
                    prevent_duplicates: true,
                },

                init: {
                    PostInit() {
                        document.getElementById('ossfile').innerHTML = '';
                        document.getElementById('postfiles').onclick = () => {
                            setUploadParam(uploader, '', false);
                            return false;
                        };
                    },

                    FilesAdded(uploader, files) {
                        fs.push(...files);
                    },

                    BeforeUpload(uploader, file) {
                        setUploadParam(uploader, file.name, true);
                    },

                    UploadProgress(uploader, file) {
                        let d = document.getElementById(file.id);
                        d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                        let prog = d.getElementsByTagName('div')[0];
                        let progBar = prog.getElementsByTagName('div')[0];
                        progBar.style.width = 2 * file.percent + 'px';
                        progBar.setAttribute('aria-valuenow', file.percent);
                    },

                    FileUploaded(uploader, file, info) {
                        if (info.status == 200) {
                            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功 ' + file.name;
                        } else if (info.status == 203) {
                            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
                        } else {
                            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                        }
                        uploaded(file);
                        this.g_object_name_type = 'local_name';
                    },

                    Error(uploader, err) {
                        if (err.code == -600) {
                            document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了"));
                        } else if (err.code == -601) {
                            document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对"));
                        } else if (err.code == -602) {
                            document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
                        } else {
                            document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                        }
                    }
                }
            });
            uploader.init();
            this.uploader = uploader;
        },
    }
</script>

<style scoped>
    .btn {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        text-decoration: none;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    a.btn:hover {
        background-color: #3366b7;
    }

    .progress {
        margin-top: 2px;
        width: 200px;
        height: 14px;
        margin-bottom: 10px;
        overflow: hidden;
        background-color: #f5f5f5;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    }

    .progress-bar {
        background-color: rgb(92, 184, 92);
        background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
        background-size: 40px 40px;
        box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
        box-sizing: border-box;
        color: rgb(255, 255, 255);
        display: block;
        float: left;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        transition-delay: 0s;
        transition-duration: 0.6s;
        transition-property: width;
        transition-timing-function: ease;
        width: 266.188px;
    }
</style>