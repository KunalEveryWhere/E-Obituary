const database = {
    /*Table 1*/ //This table stores the state of allow signUps.
    "signUp": {
        "isOpen": true, //PRIMARY KEY. Boolean Type. The value may be 'false'. 
        "lastModified": "2022-10-10 07:00:46.933792+00" //Timestamp Type with TimeZone. For the lastUpdate on the 'isOpen' value.
    },

    /*Table 2*/ //This table stores the values required for each company branch footer.
    "footerStyle": { //Note: Each set of entry represents one row in the table.
            "footerID": 1, //PRIMARY KEY. Int Type. This stores the footer ID, can range from 1 to 'n' (limit to 5 for now)
            "desc": "This is the Footer Style 1", //varchar Text Type. This stores a simple description of the footer
            "title": "Company Title Here", //varchar Text Type. This store the company title.
            "mobileNumber": "0910 - 598 - 200", //varchar Text Type. This stores the contact mobile number.
            "addressText": "Bla Bla Bla", //varchar Text Type. This stores the address in text format.
            "addressURL": "https://maps.google.com/sdjh", //varchar Text Type. Stores the maps link of the company
            "updatedAt": "2022-10-10 07:00:46.933792+00", //Timestamp Type with TimeZone. For the updatedAt on the footer value.
            "buffer1": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
            "buffer2": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
            "buffer3": "BlaBlaBla" //varchar Text Type. (used as buffer for future additions to the project)
    },
    
    /*Table 3*/ //This table stores the values for generating sites.
    "generatedSites": { //Note: Each set of entry represents one row in the table.
        "uuid": "adw77qagdbv2", //PRIMARY KEY. UUID type text. Stores the UUID for each site. It is a 12-lenght random string generated.
        "siteFormat": "template1", //varchar Text Type. Stores the site format / template style it was created for.
        "footerID": 1, // Int Type. This stores the footer ID, can range from 1 to 'n' (limit to 5 for now)
        "imagePath": "adw77qagdbv2.jpg", //varchar Text Type. This stores the accoompaning picture name and extension so it can be found later.
        "title": "BlaBlaBla", //varchar Text Type. Stores the title of the web-page / person name.
        "generatedLink": "/adw77q", //varchar Text Type. This stores the final extenstion of the URL for the generated link.
        "parameter1": "BlaBlaBla", //varchar Text Type. Stores the content for the first Parameter.
        "parameter2": "BlaBlaBla", //varchar Text Type. Stores the content for the second Parameter.
        "parameter3": "BlaBlaBla", //varchar Text Type. Stores the content for the third Parameter.
        "parameter4": "BlaBlaBla", //varchar Text Type. Stores the content for the fourth Parameter.
        "parameter5": "BlaBlaBla", //varchar Text Type. Stores the content for the fifth Parameter. (may be used as buffer)
        "parameter6": "BlaBlaBla", //varchar Text Type. Stores the content for the sixth Parameter. (may be used as buffer)
        "addressURL": "https://maps.google.com/sdjh", //varchar Text Type. Stores the maps link provided for the event venue. Default value is 'null'
        "updatedAt": "2022-10-10 07:00:46.933792+00", //Timestamp Type with TimeZone. For the updatedAt on the 'generatedSites' value. Default value set to (now())
        "deleteOn": "2022-10-10 07:00:46.933792+00", //Timestamp Type with TimeZone. The current row / website data would be deleted after this point. Default date is set 1 month forward to creation date, at 00:00HRS. Default value is set to 1 month from updatetime. ((now() + '1 mon'::interval))
        "buffer1": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
        "buffer2": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
        "buffer3": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
    },

    /*Table 4*/ //This table stores template data for quick-fill while in CreateNew page.
    "templateData" : {
        "templateID": 1, //PRIMARY KEY. Int Type. This stores the saved template data ID for quick-fill. (can range from 1 to 7)
        "siteFormat": "template1", //varchar Text Type. Stores the site format / template style it was created for.
        "footerID": 1, //Int Type. This stores the footer ID, can range from 1 to 'n' (limit to 5 for now)
        "title": "BlaBlaBla", //varchar Text Type. Stores the title of the web-page / person name.
        "parameter1": "BlaBlaBla", //varchar Text Type. Stores the content for the first Parameter.
        "parameter2": "BlaBlaBla", //varchar Text Type. Stores the content for the second Parameter.
        "parameter3": "BlaBlaBla", //varchar Text Type. Stores the content for the third Parameter.
        "parameter4": "BlaBlaBla", //varchar Text Type. Stores the content for the fourth Parameter.
        "parameter5": "BlaBlaBla", //varchar Text Type. Stores the content for the fifth Parameter. (may be used as buffer)
        "parameter6": "BlaBlaBla", //varchar Text Type. Stores the content for the sixth Parameter. (may be used as buffer)
        "addressURL": "https://maps.google.com/sdjh", //varchar Text Type. Stores the maps link provided for the event venue. Default value is 'null'
        "updatedAt": "2022-10-10 07:00:46.933792+00", //Timestamp Type with TimeZone. For the updatedAt on the 'generatedSites' value. Default value set to (now())
        "buffer1": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
        "buffer2": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
        "buffer3": "BlaBlaBla", //varchar Text Type. (used as buffer for future additions to the project)
    },

    /*Table 5*/ //This table stores the the feedback info. (experimental)
    "feedbackInfo": { //Note: Each set of entry represents one row in the table in the table.
        "siteFormat": "template1", //varchar Text Type. Stores the site format / template it was created for.
        "question1": 1, //int value. Stores from range of 1 to 5. Shows the feedback given from user to the Generatedsite
        "question2": 2, //int value. Stores from range of 1 to 5. Shows the feedback given from user to the Generatedsite
        "question3": 4, //int value. Stores from range of 1 to 5. Shows the feedback given from user to the Generatedsite
        "question4": 2, //int value. Stores from range of 1 to 5. Shows the feedback given from user to the Generatedsite (may be used as buffer)
        "question5": 3, //int value. Stores from range of 1 to 5. Shows the feedback given from user to the Generatedsite (may be used as buffer)
        "question6": 5, //int value. Stores from range of 1 to 5. Shows the feedback given from user to the Generatedsite (may be used as buffer)
        "additionalComments": "BlaBlaBla", //varchar Text Type. Stores any additional comment from the user.
        "name": "Kunal Prasad", //varchar Text Type. Stores the name of the responder to the questionare.
        "email": "kunaleverywher@gmail.com", //varchar Text Type. Stores the email of the responder to the questionare.
        "createdAt": "2022-10-10 07:00:46.933792+00" //Timestamp Type with TimeZone with TimeZone. For the createdAt on the 'feedbackInfo' value.
    }
}

const buckets = {
    /*Storage Bucket 1*/ //This bucket stores all the company logo images.
    "companylogo": [
        "company-logo-1.png" //It stores the 'n' company logo.
        //addedOn: timestamp, (INBUILT)
        //lastModified: timestamp, (INBUILT)
    ],

    /*Storage Bucket 2*/ //This bucket stores all the avatars for generated websites.
    "avatars": [ //Note: Each entry represents one file created in the bucket repository.
        'adw77q.png' //It stores the avatar picture renamed as the same UUID for it's generatedSites data entry.
        //addedOn: timestamp, (INBUILT)
        //lastModified: timestamp, (INBUILT)
    ],

    /*Storage Bucket 3*/ //This bucket stores upload image map for the generated websites.
    "maps": [//Note: Each entry represents one file created in the bucket repository.
        'adw77q-map.png' //It stores the map / location image uploaded (if any). Note its renamed as the same UUID for it's generatedSites data entry, with concat of '-map' 
        //addedOn: timestamp, (INBUILT)
        //lastModified: timestamp, (INBUILT)
    ]
}