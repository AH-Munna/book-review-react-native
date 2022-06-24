import axios from 'axios';
import { debug } from 'react-native-reanimated';
import { navigate } from '../components/myNavigationRoot.js';
import * as actTypes from './ActionType.js';

export const addBook = book => (dispatchEvent, gState) => {
    // const token = gState().state.token;
    axios.post("https://book-review-ah-default-rtdb.asia-southeast1.firebasedatabase.app/books.json", book)
        .then(res => {
            debugger
            navigate('Library');
        }).catch(err => {
            console.log(err);
            debugger
        })
}

const setBooks = books => {
    return {
        type: actTypes.LOAD_BOOKS,
        payload: books,
    }
}
export const loadBooks = () => dispatchEvent => {
    axios.get("https://book-review-ah-default-rtdb.asia-southeast1.firebasedatabase.app/books.json")
        .then(response => {
            dispatchEvent(setBooks(response.data));
        }).catch(err => {
            console.log(err);
            debugger
        })
}

const addReviewRedux = (reviewObj, key) => {
    return {
        type: actTypes.ADD_REVIEW,
        payload: {
            reviewObj: reviewObj,
            key: key,
        }
    }
}
export const submitReview = reviewObj => dispatchEvent => {
    axios.post("https://book-review-ah-default-rtdb.asia-southeast1.firebasedatabase.app/reviews.json", reviewObj)
        .then(res => {
            if (res.status <= 204 && res.status >= 200) {
                alert("review submitted successfully")
                dispatchEvent(addReviewRedux(reviewObj, res.data.name))
            } else {
                alert("error occured");
                debugger
            }
        })
        .catch(err => {
            console.log(err);
            debugger
        })
}

const setReview = reviews => {
    return {
        type: actTypes.LOAD_REVIEW,
        payload: reviews,
    }
}
export const loadReview = () => dispatchEvent => {
    axios.get("https://book-review-ah-default-rtdb.asia-southeast1.firebasedatabase.app/reviews.json")
        .then(response => {
            dispatchEvent(setReview(response.data));
        }).catch(err => {
            console.log(err);
            debugger
        })
}