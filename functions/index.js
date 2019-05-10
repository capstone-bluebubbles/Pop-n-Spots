const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database()
const ref = db.ref('/messages')


exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const snapshot = await admin
    .database()
    .ref('/messages')
    .push({ original: original });
  res.redirect(303, snapshot.ref.toString());
});

exports.updateMessage = ref.update({
  'newValue': 'New Value'
})