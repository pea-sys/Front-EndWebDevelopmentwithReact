import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    };

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments',{
        method:'POST',
        body: JSON.stringify(newComment),
        headers: {
             'Content-Type': 'application/json'
        },
        credentials:'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;

            throw error;
        }
    },
        error => {
            var errorMessage = new Error(error.errorMessage);
            throw errorMessage;
        }
    )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('Post comments: ' + error.message);
            alert('Comments could not be posted:\n' + error.message)
        })
};
export const postFeedback = (feedback) => () => {
    const newFeedback = Object.assign({ date: new Date().toISOString() }, feedback);

	return fetch(baseUrl + 'feedback', {
		body: JSON.stringify(feedback),
		credentials: 'same-origin',
		headers:{
			'Content-type':'application/json'
		},
		method: 'POST',
	}).then(response => {
		if(response.ok)
			return response 
		else {
			var error = new Error('Error' + response.status + ':' + response.statusText)
			error.response = response
			throw error  
		}
	})
	.then(response => response.json())
	.then(feedback => alert('Your feedback is submitted \n' + JSON.stringify(feedback)))
	.catch(error => alert('Your feedback could not be sent'))
} 
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;

                throw error;
            }
        },
            error => {
                var errorMessage = new Error(error.errorMessage);
                throw errorMessage;
            }
        )

        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => (dispatch) => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
}); 


