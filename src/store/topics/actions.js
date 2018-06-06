import _ from 'lodash';
import * as types from './actionTypes';
import redditService from '../../services/reddit';
import * as topicsSelectors from './reducer';
import * as postActions from '../posts/actions';

export function fetchTopics() {
    return async(dispatch, getState) => {
        try {
            const subredditArray = await redditService.getDefaultSubreddits();
            const topicsByUrl = _.keyBy(subredditArray, (subreddit) => subreddit.url);

            dispatch({
                type: types.TOPICS_FETCHED,
                topicsByUrl,
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export function selectTopic(topicUrl) {
    return (dispatch, getState) => {
        const selectedTopics = topicsSelectors.getSelectedTopicUrls(getState());
        let newSelectedTopics;

        if (_.indexOf(selectedTopics, topicUrl) !== -1) {
            newSelectedTopics = _.without(selectedTopics, topicUrl);
        } else {
            newSelectedTopics = selectedTopics.length < 3 ?
                selectedTopics.concat(topicUrl) :
                selectedTopics.slice(1).concat(topicUrl);
        }

        dispatch({
            type: types.TOPICS_SELECTED,
            selectedTopicUrls: newSelectedTopics,
        });

        if (newSelectedTopics.length === 3) {
            dispatch(postActions.fetchPosts());
        }
    };
}

export function finalizeTopicSelection() {
    return ({
        type: types.TOPIC_SELECTION_FINALIZED,
    });
}