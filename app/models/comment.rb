# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#
# Indexes
#
#  index_comments_on_article_id  (article_id)
#

class Comment < ApplicationRecord
  # バリデーション抜け漏れ: 空文字や異常に長いコメントを防げない
  # validates :content, presence: true
  # validates :content, length: { minimum: 1, maximum: 1000 }

  belongs_to :article
end
