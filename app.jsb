{
    "projectName": "Project Name",
    "licenseText": "Copyright(c) 2012 Company Name",
    "builds": [
        {
            "name": "All Classes",
            "target": "all-classes.js",
            "options": {
                "debug": true
            },
            "files": []
        },
        {
            "name": "Application - Production",
            "target": "app-all.js",
            "compress": true,
            "files": [
                {
                    "path": "",
                    "name": "all-classes.js"
                },
                {
                    "path": "",
                    "name": "app.js"
                }
            ]
        }
    ],
    "resources": []
}