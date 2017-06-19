import DOMPurify from 'dompurify'

const initialState = {
  status: 'Pending',
  posts: [],
  featuredWork: [],
  featuredBlog: [],
  content: {},
  page: {},
  searchStatus: 'Pending',
  search: []
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'GET_FEED_PENDING':{
            state = {...state, status: 'Pending'};
            break;
        }
        case 'GET_FEED_FULFILLED':{
            state = {...state, posts: buildWordpressObj(action.payload.data.posts), status: 'Fulfilled'};
            break;
        }
        case 'GET_FEED_REJECTED':{
            state = {...state, status: 'Error'};
            break;
        }
        case 'GET_HOME_REJECTED':{
            state = {...state, status: 'Error'};
            break;
        }
        case 'GET_HOME_PENDING':{
            state = {...state, status: 'Pending'};
            break;
        }
        case 'GET_HOME_FULFILLED':{
            state = {...state, content: buildWPContentObj(action.payload.data.posts), status: 'Fulfilled'};
            break;
        }
        case 'GET_FEATURED_REJECTED':{
            state = {...state, status: 'Error'};
            break;
        }
        case 'GET_PAGE_PENDING':{
            state = {...state, status: 'Pending'};
            break;
        }
        case 'GET_PAGE_FULFILLED':{
            state = {...state, page: buildWPPageObj(action.payload.data), status: 'Fulfilled'};
            break;
        }
        case 'GET_PAGE_REJECTED':{
            state = {...state, status: 'Error'};
            break;
        }
        case 'GET_SEARCH_PENDING':{
            state = {...state, searchStatus: 'Pending'};
            break;
        }
        case 'GET_SEARCH_FULFILLED':{
            state = {...state, search: buildWordpressObj(action.payload.data.posts), searchStatus: 'Fulfilled'};
            break;
        }
        case 'GET_SEARCH_REJECTED':{
            state = {...state, searchStatus: 'Error'};
            break;
        }
        default:
    }
    return state;
}

function buildWordpressObj(wp) {
  let pArray = [];
  for (var i=0; i < wp.length; i++) {
    let pObj = {
      id: wp[i].ID,
      title: wp[i].title,
      tag: convertTags(wp[i].tags),
      img: wp[i].featured_image,
      date: wp[i].date,
      slug: wp[i].slug
    }
    pArray.push(pObj);
  }
  return pArray;
}

function buildWPPageObj(wp) {
  //wp.content = wp.content.replace(/<!--yt /g, '{yt').replace(/ yt-->/g, '}');
  return wp;
}

function buildWPContentObj(wp) {
  let cObj = {};
  for (var c=0; c < wp.length; c++){
    //wp[c].content = wp[c].content.replace(/(<([^>]+)>)/ig,"").replace(/&#8217;/g, "'").replace(/&#8211;/g, '-');
    wp[c].content = DOMPurify.sanitize(wp[c].content);
    cObj[wp[c].slug] = wp[c];
  }
  return cObj;
}

function convertTags (obj) {
    var keys = Object.keys(obj);
    var kString = '';
    for (var i=0; i < keys.length; i++) {
      if (i > 0){
        kString = kString + ' #' + keys[i];
      }else {
        kString = kString + '#' + keys[i];
      }
    }
    return kString;
};
