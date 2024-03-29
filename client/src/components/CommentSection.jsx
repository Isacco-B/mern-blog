/* eslint-disable react/prop-types */
import { Alert, Button, Textarea, Modal, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function getComments() {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getComments();
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError("");
        setComments([data, ...comments]);
      }
      if (!res.ok) {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }

    return;
  }

  async function handleLike(commentId) {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) => {
            comment._id === commentId
              ? {
                  ...comment,
                  lieks: data.likes,
                  numberOfLikes: data.numberOfLikes,
                }
              : comment;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleEdit(comment, editedContent) {
    setComment(
      comments.map((c) => {
        c._id === comment._id ? { ...c, content: editedContent } : c;
      })
    );
  }

  async function handleDelete(commentId) {
    try {
      if (!currentUser) {
        navigate(`/sign-in`);
      }
      const res = await fetch(
        `/api/comment/deleteComment/${commentId}`
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setComments((comments.filter((comment)=> comment._id !== commentId)))
      }

    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt="profile-picture"
            className="w-6 h-6 rounded-full"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-sm text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-500 my-5">
          You must be signed in to comment.
          <Link to="/sign-in" className="text-cyan-600 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">
              {comment ? 200 - comment.length : 200} characters remaning
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comment yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-2">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment, i) => (
            <Comment
              key={i}
              comment={comment}
              onLike={handleLike}
              handleEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-5">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I&apos; m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
