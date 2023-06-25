const functions = require("firebase-functions");
const universal = require('./dist/ngx-ssr-app/server/main');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const Storage = require('firebase-admin/storage');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.ssrAppFn = functions.https.onRequest(universal.app());

initializeApp();

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
    // Check if user meets role criteria.
    if ((user.email && user.emailVerified) || user.phoneNumber) {
        const customClaims = {
            admin: user.email === 'sunil.divyam@gmail.com' ? true : false,
            author: true
        };

        try {
            // Set custom user claims on this newly created user.
            await getAuth().setCustomUserClaims(user.uid, customClaims);
        } catch (error) {
            console.log(error);
        }
    }
});


// Function to get rewrite url of sitemap.xml from store.
exports.getSitemapXmlDownloadUrlFn = functions.https.onRequest(async (req, res) => {
    const storage = Storage.getStorage();
    const bucket = storage.bucket();
    const file = bucket.file('sitemap.xml');
    const fileExists = await file.exists();

    if (fileExists && fileExists.length && fileExists[0] === true) {
        const [metadata] = await file.getMetadata();

        if (metadata && metadata.metadata && metadata.metadata.firebaseStorageDownloadTokens) {
            const fileStream = file.createReadStream();
            let xmlData = '';
            fileStream.on('data', (chunk) => {
                xmlData += chunk.toString();
            });
            fileStream.on('end', () => {
                res.set('Content-Type', 'text/xml');
                res.send(xmlData);
            });

            fileStream.on('error', () => {
                res.status(500).send('Error Reading sitemap.xml file');
            });
        } else {
            res.status(404).send('File not found');
        }
    } else {
        res.status(404).send('File not found');
    }
});


exports.getImageFn = functions.https.onRequest(async (request, response) => {
    try {
        const imageId = request.query.imageId; // Assuming the image ID is passed as a query parameter
        const storage = Storage.getStorage();
        const bucket = storage.bucket(); // Get the default Firebase Storage bucket

        const file = bucket.file(imageId);
        const fileExists = await file.exists();

        if (!fileExists[0]) {
            response.status(404).send('Image not found');
            return;
        }

        // Set appropriate headers for the image response
        response.set('Cache-Control', 'public, max-age=3600');
        response.set('Content-Type', 'image/jpeg');

        // Create a readable stream from the file and pipe it to the response
        file.createReadStream().pipe(response);
    } catch (error) {
        console.error('Error retrieving image:', error);
        response.status(500).send('An error occurred');
    }
});
