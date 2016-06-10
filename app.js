// 基本参考URL: http://qiita.com/naga3/items/e63144e17cb1ab9e03e9
// 認証システム参考URL: http://qiita.com/n0bisuke/items/2514197d8791abbc7d87


var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();
var users;

app.use(express.static('front'));
app.use(bodyParser.json());
app.listen(3000);

mongodb.MongoClient.connect("mongodb://localhost:27017/test", function(err, database) {
  users = database.collection("users");
});

// 一覧取得
app.get("/api/users", function(req, res) {
  users.find().toArray(function(err, items) {
    res.send(items);
  });
});

// 個人取得
app.get("/api/users/:_id", function(req, res) {
  users.findOne({_id: mongodb.ObjectID(req.params._id)}, function(err, item) {
    res.send(item);
  });
});

// 検索
// ????

// 追加・更新
app.post("/api/users", function(req, res) {
  var user = req.body;
  if (user._id) user._id = mongodb.ObjectID(user._id);
  users.save(user, function() {
    res.send("insert or update");
  });
  
  // 一括追加
  // ????
});

// 削除
app.delete("/api/users/:_id", function(req, res) {
  users.remove({_id: mongodb.ObjectID(req.params._id)}, function() {
    res.send("delete");
  });
});

// 一括削除
// ????
