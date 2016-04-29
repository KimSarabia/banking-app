'use strict';

var express = require("express");

var router = express.Router();

var db = require("../config/db");

router.get('/',function(req,res,next){
  db.query('SELECT * FROM transactions', function(err,row,fields){
    if(err){
      res.status(400).send(err);
      return;
    }
    console.log(req);
    res.send(row);
  });
});

router.get('/name/:id',function(req,res,next){
  db.query('SELECT * FROM transactions WHERE ?', {id:req.params.id}, function(err,row,fields){
    if(err){
      res.status(400).send(err);
      return;
    }
    console.log(req);
    res.send(row);
  });
});

router.post('/',function(req,res,next){
  db.query('INSERT INTO transactions SET ?', req.body, function(err,result){
    if(err){
      res.status(400).send(err);
      return;
    }
    console.log("result: ", result);
    res.send(result);
  });
});

router.get('/types',function(req,res,next){
  console.log("types");
  db.query('SELECT DISTINCT type FROM transactions', function(err,row,fields){
    if(err){
      res.status(400).send(err);
      return;
    }
    console.log("row: ", row);
    res.send(row);
  });
});

router.get('/names',function(req,res,next){
  console.log("names");
  db.query('SELECT DISTINCT name FROM transactions', function(err,row,fields){
    if(err){
      res.status(400).send(err);
      return;
    }
    console.log("row: ", row);
    res.send(row);
  });
});

router.put('/:id',function(req,res,next){
  var updateString = "UPDATE transactions SET type ='" +
  req.body.type + "',name ='" +
  req.body.name + "',amount ='" +
  req.body.amount +"', date='" +
  req.body.date +"', note='" + req.body.note +"' WHERE id='" + req.params.id +"'";

  console.log(updateString);
  db.query(updateString, function(err,result){
    if(err){
      res.status(400).send(err);
      return;
    }
    console.log("result: ", result);
    res.send(result);
  });
});

router.get('/type/:type', function(req,res,next){
  db.query('SELECT * FROM transactions WHERE ?', req.params ,function(err, results){
    if(err){
      res.status(400).send(err);
      return;
    }
    res.send(results);
  });
});

router.get('/name/:name', function(req,res,next){
  db.query('SELECT * FROM transactions WHERE ?', req.params ,function(err, results){
    if(err){
      res.status(400).send(err);
      return;
    }
    res.send(results);
  });
});

router.delete('/:id',function(req,res,next){
  db.query('DELETE FROM transactions WHERE ?', {id:req.params.id}, function(err,result){
    if(err){
      res.status(400).send(err);
      return;
    }
    res.send(result);
  });
});


module.exports = router;
