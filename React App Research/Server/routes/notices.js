const router = require("express").Router();
let Notice = require("../models/notice");

router.route("/AddNotice").post((req, res) => {

    const noticeId = req.body.noticeId;
    const noticeTitle = req.body.noticeTitle;
    const date = req.body.date;
    const noticePurpose = req.body.noticePurpose;
    
    const newNotice = new Notice({
        noticeId,
        noticeTitle,
        date,
        noticePurpose
    })

    newNotice.save().then(() => {
        res.json("Notice Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/viewNotice").get((req, res) => {
    Notice.find().then((notices) => {
        res.json(notices)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/update/:id").put(async (req, res) => {
    let noticeID = req.params.id;
    const {noticeId, noticeTitle, date, noticePurpose} = req.body;

    const updateNotice = {
        noticeId,
        noticeTitle,
        date,
        noticePurpose
        
    }
    
    const update = await Notice.findByIdAndUpdate(noticeID, updateNotice)
    .then(() => {
        res.status(200).send({status: "Notice updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

})


router.route("/delete/:id").delete(async (req, res) => {
    let noticeID = req.params.id;

    await Notice.findByIdAndDelete(noticeID)
    .then(() => {
        res.status(200).send({status: "notice deleted"});
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "error with delete user", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let noticeID = req.params.id;
    const notice = await Notice.findById(noticeID)
    .then((notice) => {
        //res.status(200).send({status: "Notice fetched", notice: notice})
        res.json(notice)

    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "error with fetch notice", error: err.message});
    })
})

module.exports = router; 