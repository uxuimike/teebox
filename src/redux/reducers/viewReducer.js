const initialState = {
    device: 'mobile',
    orientation: 'portrait',
    width: 960,
    height: 1080,
    scroll: -20,
    sections: [],
    activeSection: 'none',
    style: {className: 'none', color: 'rgb(79, 79, 79)'}
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'CHANGE_SIZE':{
            state = {...state, width: action.payload.width, height: action.payload.height};
            break;
        }
        case 'CHANGE_SCROLL':{
          state = {...state, scroll: action.payload.scrollTop};
          break;
        }
        case 'REG_SECTION':{
          let sections
          const secIndex = inArray(action.payload.section.section, state.sections);
          if (secIndex > -1){
            sections = state.sections;
            sections[secIndex].offset = action.payload.section.offset;
          }else {
            sections = [ ...state.sections, action.payload.section];
          }
          state = {...state, sections: sections.sort(sortSections)};;
          break;
        }
        case 'CHANGE_STYLE':{
          state = {...state, style: action.payload.style, activeSection: action.payload.section};
          break;
        }
        default:
    }
    return state;
}

function sortSections(a,b) {
  if (a.offest > b.offset)
    return -1;
  if (a.offset < b.offset)
    return 1;
  return 0;
}

function inArray(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].section === nameKey) {
            return i;
        }
    }
    return -1;
}
