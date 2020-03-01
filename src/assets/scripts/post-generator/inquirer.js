#!/usr/bin/env node

const clear = require('clear')
const log = require('console-emoji')
const inquirer = require('inquirer')

const { exec } = require('child_process')
const fs = require('fs')

const posts = require('../blog-posts')
const categories = require('./blog-categories')

clear()
console.log("You want to create a new blog post? Awesome. You're a trooper!")

const questions = [
  {
    name: 'postAuthor',
    type: 'input',
    message: "What's your name? (Or the name of the author)",
    validate(value) {
      if (value.length) {
        return true
      }

      log('Please provide the name of the author :point_down_2:')
      return false
    }
  },
  {
    name: 'postHeading',
    type: 'input',
    message: "What's the title for your blog post?",
    validate(value) {
      if (value.length) {
        return true
      }

      log('Please provide a title for your post :point_down_2:')
      return false
    }
  },
  {
    name: 'postCategory',
    type: 'list',
    message: 'Select a category for your post',
    choices: categories
  },
  {
    name: 'postMins',
    type: 'input',
    message: 'Approximately how many minutes will it take to read this post?',
    validate(value) {
      if (value.length) {
        return true
      }

      log('Please an approximate reading time :point_down_2:')
      return false
    }
  },
  {
    name: 'postText',
    type: 'input',
    message:
      'Provide a catchy blurb for your post (this appears on the listing page)',
    validate(value) {
      if (value.length) {
        return true
      }

      log('Please provide a snippet for the listing page :point_down_2:')
      return false
    }
  },
  {
    name: 'postConfirm',
    type: 'confirm',
    message: 'Save Post? You can still edit the post manually.',
    default: true
  },
  {
    name: 'postPublished',
    type: 'confirm',
    message: 'Publish your post? You can toggle published in blog-posts.js.',
    default: false
  }
]

const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')

const run = async () => {
  inquirer.prompt(questions).then(answers => {
    if (answers.postConfirm) {
      const url = slugify(answers.postHeading)
      const details = [{ ...answers, ...{ postUrl: `/blog/${url}` } }]
      const updatedPosts = [...details, ...posts]

      fs.writeFile(
        'src/assets/scripts/blog-posts.js',
        `module.exports = ${JSON.stringify(updatedPosts)}`,
        err => {
          if (err) throw err
          console.log('Blog items updated.')
          const newFile = `src/pages/blog/${url}.pug`
          exec(
            `cp src/assets/scripts/post-generator/blank.pug ${newFile}`,
            err => {
              if (err) throw err
              fs.readFile(`src/pages/blog/${url}.pug`, 'utf8', function(
                err,
                data
              ) {
                if (err) throw err
                let result = data.replace(/#postAuthor/g, answers.postAuthor)
                result = result.replace(/#postTitle/g, answers.postHeading)
                result = result.replace(/#postSlug/g, url)
                result = result.replace(/#postText/g, answers.postText)

                fs.writeFile(newFile, result, 'utf8', function(err) {
                  if (err) throw err
                })
              })
            }
          )
          console.log('Your post has been added!')
        }
      )
    }
  })
}

run()
