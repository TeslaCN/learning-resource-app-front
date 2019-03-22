import ajax from '@/util/ajax'

export default {
    getCompletionSuggestions(prefix, done) {
        ajax.get('/search/completion-suggestions', {prefix}, done);
    },
    getMatch(text, done, page = 1, size = 10) {
        ajax.get('/search/match', {text, page: --page, size}, done);
    },
    getPhraseSuggestions(text, done) {
        ajax.get('/search/phrase-suggestions', {text}, done);
    },
    getTermSuggestions(text, done) {
        ajax.get('/search/term-suggestions', {text}, done);
    }
}