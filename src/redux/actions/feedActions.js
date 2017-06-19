import axios from "axios";

export function getFeed(query) {
  return {
    type: 'GET_FEED',
    payload: axios.get('https://public-api.wordpress.com/rest/v1.1/sites/uxuimike.wordpress.com/posts/?' + query)
    //payload: axios.get('https://public-api.wordpress.com/rest/v1.1/batch/?urls[0]=/sites/uxuimike.wordpress.com/posts/?category=work&urls[1]=/sites/uxuimike.wordpress.com/posts/? + query')
  }
}

export function getHome() {

  return {
    type: 'GET_HOME',
    payload: axios.get('https://public-api.wordpress.com/rest/v1.1/sites/uxuimike.wordpress.com/posts/?pretty=true&category=content')
  }
}

export function getPage(query) {
  return {
    type: 'GET_PAGE',
    payload: axios.get('https://public-api.wordpress.com/rest/v1.1/sites/uxuimike.wordpress.com/posts/slug:' + query)
    //payload: axios.get('https://public-api.wordpress.com/rest/v1.1/batch/?urls[0]=/sites/uxuimike.wordpress.com/posts/?category=work&urls[1]=/sites/uxuimike.wordpress.com/posts/? + query')
  }
}

export function getSearch(query) {
  return {
    type: 'GET_SEARCH',
    payload: axios.get('https://public-api.wordpress.com/rest/v1.1/sites/uxuimike.wordpress.com/posts/?category=blog&' + query)
  }
}
