import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import * as topicsSelectors from '../topics/reducer';

const initialState = Immutable({
    postsById: undefined,
    currentFilter: "",
    currentPostId: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.POSTS_FETCHED:
            return state.merge({
                postsById: action.postsById,
            });

        case types.FILTER_CHANGED:
            return state.merge({
                currentFilter: action.filter,
            });

        case types.POST_SELECTED:
            return state.merge({
                currentPostId: action.postId,
            });

        default:
            return state;
    }
}

export function getPosts(state) {
    const currentFilter = state.posts.currentFilter;
    const postsById = state.posts.postsById;
    const currentTopicUrls = topicsSelectors.getSelectedTopicsByUrl(state);
    const postsIdArray = currentFilter === 'all' ?
        _.filter(_.keys(postsById), (postId) => currentTopicUrls[postsById[postId].topicUrl]) :
        _.filter(_.keys(postsById), (postId) => postsById[postId].topicUrl === currentFilter);

    return [
        postsById,
        postsIdArray,
    ];
}

export function getCurrentFilter(state) {
    return state.posts.currentFilter;
}

export function getCurrentPost(state) {
    return _.get(state.posts.postsById, state.posts.currentPostId);
}