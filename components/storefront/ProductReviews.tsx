'use client';

import { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Plus, X } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export default function ProductReviews({ productName }: { productName: string }) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Alex Vance',
      rating: 5,
      date: '2 days ago',
      comment: 'The 3D WebGL preview was completely accurate to real life! Sound staging is incredible and the material finish feels ultra-premium.',
      verified: true,
      helpfulCount: 24,
    },
    {
      id: '2',
      author: 'Sarah Lin',
      rating: 5,
      date: '1 week ago',
      comment: 'Loved being able to inspect the headset from every angle in 3D before buying. Fast express shipping too!',
      verified: true,
      helpfulCount: 12,
    },
    {
      id: '3',
      author: 'Marcus Brody',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Super comfortable for long gaming sessions. Spatial audio depth is top tier.',
      verified: true,
      helpfulCount: 8,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      verified: true,
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setIsModalOpen(false);
  };

  const handleHelpful = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  return (
    <div className="space-y-8 pt-12 border-t border-white/10">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            Customer Reviews <MessageSquare className="w-5 h-5 text-purple-400" />
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-xl font-bold text-white">4.9 out of 5</span>
            <span className="text-gray-400 text-sm">({reviews.length} verified reviews)</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Write a Review
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="glass-panel p-6 rounded-2xl border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                    {rev.author}
                    {rev.verified && (
                      <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified Buyer
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-gray-500">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-gray-600'}`} />
                ))}
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed font-light">{rev.comment}</p>

            <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
              <span>Was this review helpful?</span>
              <button
                onClick={() => handleHelpful(rev.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-purple-400" /> Helpful ({rev.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d0d24] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Write a Review for {productName}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-400 mb-1 font-medium text-xs">Your Name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Jordan Reed"
                  className="w-full bg-[#030309] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium text-xs">Rating</label>
                <div className="flex gap-2 text-amber-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${star <= newRating ? 'fill-current' : 'text-gray-600'}`}
                      onClick={() => setNewRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium text-xs">Review Comment</label>
                <textarea
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details about sound quality, 3D experience, comfort..."
                  className="w-full bg-[#030309] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
