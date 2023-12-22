import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeatureReview from '../components/FeatureReview';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [editedReviewContent, setEditedReviewContent] = useState('');
  const storedUserEmail = sessionStorage.getItem('userEmail');
  const [userData, setUserData] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/getUserData?email=${storedUserEmail}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (storedUserEmail) {
      fetchUserData();
    }
  }, [storedUserEmail]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/review/getAllReviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const createReview = async () => {
    // Validate content and rating
    if (!newReview.trim() || newRating === 0) {
      setIsFormValid(false);
      return;
    }

    try {
      await axios.post(`http://localhost:8080/review/createReview?userId=${userData.userID}`, {
        content: newReview,
        rating: newRating,
      });
      fetchReviews();
      setNewReview('');
      setNewRating(0);
      setIsFormValid(true); // Reset the form validity after successful submission
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const startEditingReview = (reviewId, content) => {
    setEditReviewId(reviewId);
    setEditedReviewContent(content);
  };

  const saveEditedReview = async (reviewId, editedContent) => {
    try {
      await axios.put(`http://localhost:8080/review/updateReview/${reviewId}`, {
        content: editedContent,
      });
      fetchReviews();
      setEditReviewId(null);
      setEditedReviewContent('');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const cancelEditingReview = () => {
    setEditReviewId(null);
    setEditedReviewContent('');
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8080/review/deleteReview/${reviewId}`);
      console.log("Successfully deleted the review.");
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  function base64ToDataURL(base64String) {
    return `data:image/png;base64,${base64String}`;
  }

  return (
    <div>
      <FeatureReview />
      <div className="container mx-auto p-4 bg-gray-100">
        <main>
        <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Create a Review</h2>
            {!isFormValid && (
              <p className="text-red-500 text-center mb-2">Both content and rating are required.</p>
            )}
            <div className="mb-4 text-center text-4xl">
              <Rating
                id="rating"
                name="rating"
                value={newRating}
                onChange={(event, newValue) => setNewRating(newValue)}
              />
            </div>
            <div className="mb-4 flex justify-center">
              <textarea
                id="content"
                name="content"
                placeholder='Write your review here...'
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-3/5 h-32 px-4 py-2 border-2 rounded-md border-indigo-500 "
              />
            </div>
            <div className='flex justify-center'>
              <button onClick={createReview} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Submit Review
              </button>
            </div>
          </section>

          <section className="mb-" id="all-reviews">
            <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>
            {reviews
              .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
              .map((review) => (
                <div key={review.reviewID} className="bg-white mb-4 p-4 border rounded-md relative ">
                  <span
                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                  ></span>

                  <div className="flex items-center mb-2">
                    <img
                      src={review.user.profileImage ? base64ToDataURL(review.user.profileImage) : '/user.png'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <span className="font-semibold text-lg">{review.user.fname} {review.user.lname}</span>
                      <br />
                      <span className="text-sm text-gray-500">{review.user.email}</span>
                    </div>
                  </div>
                  <Rating name="read-only" value={review.rating} readOnly />
                  
                  {editReviewId === review.reviewID ? (
                    <div className="mb-4">
                      <textarea
                        value={editedReviewContent}
                        onChange={(e) => setEditedReviewContent(e.target.value)}
                        className="w-full h-20 px-4 py-2 border-2 rounded-md border-indigo-500"
                      />
                      <div className='flex justify-end mt-2'>
                        <button onClick={() => saveEditedReview(review.reviewID, editedReviewContent)} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
                          Save
                        </button>
                        <button onClick={cancelEditingReview} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="mt-2">{review.content}</p>
                      {review.user.userID === userData.userID && (
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                          <div className="absolute top-0 right-0 mt-2 mr-2 flex gap-2">
                            <EditIcon onClick={() => startEditingReview(review.reviewID, review.content)} className="cursor-pointer text-gray-500" />
                            <DeleteIcon onClick={() => deleteReview(review.reviewID)} className="cursor-pointer text-gray-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            {reviews.length > reviewsPerPage && (
              <Pagination
                count={Math.ceil(reviews.length / reviewsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Review;
