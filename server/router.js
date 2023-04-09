var express = require("express"),
  passport = require("passport"),
  User = require("./user"),
  formidable = require("formidable"),
  unallocatedTasks = require("./unallocatedTasks"),
  allocatedTasks = require("./allocatedTasks"),
  async = require("async");
router = express.Router();
router.use(require("flash")());

//signout
router.post("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/allocatedTasks", function (req, res) {
  if (!req.user || req.user.username !== 'employee1')
    return res.json({ Error: "Access Denied" });
  allocatedTasks.find({}, function (err, tasks) {
    res.json(tasks);
  });
});

router.get("/unallocatedTasks", function (req, res) {
  if (!req.user || req.user.username !== 'employee1')
    return res.json({ Error: "Access Denied" });
  unallocatedTasks.find({}, function (err, tasks) {
    res.json(tasks);
  });
});

router.get("/myTasks", function (req, res) {
  if (!req.user) return res.json({ Error: "Access Denied" });
  allocatedTasks.find({ allocatedto: req.user.id }, function (err, tasks) {
    res.json(tasks);
  });
});

router.post("/assignTask/:assign/:taskId", function (req, res, next) {
  if (!req.user) return res.json({ Error: "Access Denied" });
  unallocatedTasks.find({ _id: req.params.taskId }, function (err, tasks) {
    const fields = tasks[0];
    var assignTo;
    User.find(
      {
        username: "employee2",
      },
      function (err, user) {
        assignTo = req.params.assign === "self" ? req.user.id : user[0].id;
        const newlog = new allocatedTasks({
          productType: fields.productType,
          issueType: fields.issueType,
          description: fields.description,
          policy: fields.policy,
          userid: fields.userid,
          allocatedto: assignTo,
          date: fields.date,
          user: fields.user,
        });
        newlog.save();
        unallocatedTasks.findByIdAndDelete(fields.id, {}, next);
      }
    );
  });
});

router.post("/changeStatus/:status/:taskId", function (req, res, next) {
  if (!req.user) return res.json({ Error: "Access Denied" });
  allocatedTasks.findByIdAndUpdate(
    req.params.taskId,
    { status: req.params.status },
    {},
    next
  );
});

// REGISTER
router.post("/:userType/register", function (req, res, next) {
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    userType: req.params.userType,
  });

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log("ERROR CODE 19" + err);
      return next(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        //console.log("registered new user", req.user);
        res.locals.currentUser = req.user;
        res.redirect("/newRequest");
      });
    }
  });
});

//LOGIN
router.post(
  "/:userType/login",
  function (req, res, next) {
    User.find(
      {
        username: req.body.username,
      },
      function (err, users) {
        if (err) return next(err);
        if (!users.length) return next("Error: user not exist with this type");
        async.each(
          users,
          function (user, cb) {
            if (
              user.userType &&
              user.userType.search(req.params.userType) >= 0
            ) {
              return cb();
              //reject user for different type
            } else cb("Error: user not found with this type");
          },
          next
        );
      }
    );
  },
  passport.authenticate("local", {
    successRedirect: "/newRequest",
    failureRedirect: "/login",
  })
);

router.get("/user", function (req, res) {
  return res.json(req.user);
});
router.post("/newRequest", function (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
    if(files.policy.size > 2000) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end('Limit reached for upload');
      return;
    }
    const newlog = new unallocatedTasks({
      productType: fields.productType,
      issueType: JSON.parse(fields.issueType),
      description: fields.description,
      policy: {
        filepath: files.policy.filepath,
        lastModifiedDate: files.policy.lastModifiedDate.toString(),
        mimetype: files.policy.mimetype,
        newFilename: files.policy.newFilename,
        originalFilename: files.policy.originalFilename,
        size: files.policy.size,
      },
      userid: req.user.id,
      date: Date(),
      user: {
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
      },
    });
    newlog.save();
    res.redirect("/");
  });
});

module.exports = router;
