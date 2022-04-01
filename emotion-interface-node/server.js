const express = require('express')
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { default: axios } = require('axios');
const cors = require('cors');
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(express.json());

app.post("/text", async (req,res)=>{

  try{
       
    var ID='';

    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/documents.readonly','https://www.googleapis.com/auth/drive.metadata.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = 'token.json';

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Docs API.
      authorize(JSON.parse(content), listFiles);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */

    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */

    function getNewToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    /**
     * Prints the title of a sample doc:
     * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
     */


     function listFiles(auth) {
      const drive = google.drive({version: 'v3', auth});
      drive.files.list({
        pageSize: 1,
        fields: 'nextPageToken, files(id, name)',
        orderBy: 'modifiedTime desc'
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          // console.log(files[0].id);
          ID= files[0]?.id;
          fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            authorize(JSON.parse(content), printContent);
          });
        } else {
          console.log('No files found.');
        }
      });
    }

    const printContent = (auth) => {
      const docs = google.docs({version: 'v1', auth});
      var content_string="";
      docs.documents.get({
        documentId: ID
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);

        res.data.body.content.map((val)=>{
          val.paragraph?.elements.map((text)=>{

            if(text?.textRun?.content!=undefined && !(text?.textRun?.content.match("pm")?.length>=1 || text?.textRun?.content.match("am")?.length>=1))
            { 
              content_string= content_string+text?.textRun?.content;
            }
          })
        })
        console.log(content_string);

        const response =  axios.post("http://ec2-43-204-11-138.ap-south-1.compute.amazonaws.com:5000/text",{
          content_string
        });

      });
    }
    
    
    
    
  }
  catch(e)
    { 
      console.log(e.message)
      return res.json({ error_message: e.message });
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})