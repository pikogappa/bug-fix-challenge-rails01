import $ from "jquery";
import axios from "modules/axios";
import {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_heart'


const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('.inactive-heart').removeClass('hidden')
  }
}

const handleCommentForm = () => {
  $('.show-secondary-form').on('click', () => {
    $('.show-secondary-form').addClass('hidden')
    $('.comment-text-area').removeClass('hidden')
  })
}

const appendNewComment = (comment) => {
  $('.comments-container').append(
    `<div><p>${escape(comment.content)}</p></div>`
  )
}

document.addEventListener("turbolinks:load", () => {
  const dataset = $("#article-show").data();
  const articleId = dataset.articleId;

  axios.get(`/api/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        appendNewComment(comment)
      })
    })
    .catch((error) => {
      window.alert('失敗')
    })

    handleCommentForm()

    $('.add-comment-button').on('click', () => {
      const content = $('#comment_content').val()
      if (!content) {
        window.alert('コメントを入力して下さい')
      } else {
        axios.post(`/api/articles/${articleId}/comments`, {
          comment: {content: content}
        })
        .then((res) => {
          const comment = res.data
            appendNewComment(comment)
            $('#comment_content').val('')
          })
      }
    })


  axios.get(`/api/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    });

  listenInactiveHeartEvent(articleId)
  listenActiveHeartEvent(articleId)



});
