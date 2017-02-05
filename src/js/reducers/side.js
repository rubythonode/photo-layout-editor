import { combineReducers } from 'redux';
import {
	SIDE_VISIBLE,
	ADD_FILES,
	REMOVE_FILES,
	CHANGE_ACTIVE_FILE,
} from '../actions/types';


const initialLayout = {
	visible: false,
};
let nextFileId = 0;


/**
 * Change active
 *
 * @param {Object} item
 * @param {Number} n
 * @param {String} key press key name
 */
function changeActive(item, n, key)
{
	// TODO : 키보드 누른 상태에서 선택하면 선택되는 아이템에 대해서 결정하기
	switch(key)
	{
		case 'cmd':
		case 'ctrl':
			console.log('cmd, ctrl');
			return item;
		case 'shift':
			console.log('shift');
			return item;
	}

	if (item.id === n)
	{
		return Object.assign({}, item, { active: !item.active })
	}
	else
	{
		return Object.assign({}, item, { active: false })
	}
}


function layout(state=initialLayout, action)
{
	switch (action.type) {
		case SIDE_VISIBLE:
			return Object.assign({}, state, {
				visible: action.value,
			});
			break;
		default:
			return state;
	}
}

function files(state=[], action)
{
	switch (action.type) {
		case ADD_FILES:
			return [
				...state,
				...action.files.map((o) => {
					return {
						id: nextFileId++,
						image: o,
						active: false,
					};
				}),
			];

		case REMOVE_FILES:
			return state;

		case CHANGE_ACTIVE_FILE:
			//changeActive(state, action.num);
			return state.map(s => changeActive(s, action.num, action.keyName));

		default:
			return state;
	}
}


const ple = combineReducers({
	layout,
	files,
});

export default ple;