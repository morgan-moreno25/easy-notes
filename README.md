# Easy Notes

This project is a simple application that allows the user to create, update, and delete notes from their browser's local storage.

# Overview

In this project I created a skeleton HTML document for the page and use JavaScript to dynamically render content and data to the page.

I attempted to use the MVC design pattern using ES6 classes. 

The NotesView class contains the different DOM elements that are dynamically rendered to the webpage.

The NotesController class contains the CRUD methods to feed the view class with the data it needs.

The NotesModel is embedded inside of the NotesController as the attribute NOTES.