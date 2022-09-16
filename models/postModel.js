const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const postSchema = new mongoose.Schema(
  {
    postedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    filePath: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    postedOn: {
      type: Date,
      default: new Date(),
    },
  },
  { toJSON: { virtuals: true } }
);
postSchema.virtual("countComment", {
  ref: "commentPost",
  localField: "_id",
  foreignField: "postId",
  count: true,
});
postSchema.virtual("countLike", {
  ref: "likePost",
  localField: "_id",
  foreignField: "postId",
  count: true,
});

postSchema.plugin(mongooseLeanVirtuals);
// postSchema.virtual("id").get(function () {
//   return this._id;
// });

// postSchema.set(
//   "toJSON",
//   {
//     transform: function (doc, ret) {
//       ret.postId = ret._id;
//       delete ret._id;
//       delete ret.__v;
//     },
//   },
//   { virtuals: true }
// );
module.exports = mongoose.model("post", postSchema);
