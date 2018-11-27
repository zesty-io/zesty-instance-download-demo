const fs = require('fs')
const mkdirp = require('mkdirp')
const Zesty = require('zestyio-api-wrapper')

const OUTPUT_BASE_FOLDER = 'output'
const VIEWS_FOLDER = 'views'
const STYLES_FOLDER = 'styles'
const SCRIPTS_FOLDER = 'js'

const TEMPLATE_FILE_EXTENSION = '.tpl'
const SCRIPT_FILE_EXTENSION = '.js'
const STYLES_FILE_EXTENSION = '.less'

const ENVIRONMENT_TO_USE = 'dev'

const zesty = new Zesty(
  process.env.ZESTY_INSTANCE_ZUID,
  process.env.ZESTY_ACCESS_TOKEN
)

const getInstanceData = async () => {
  try {
    // Get all the views
    mkdirp.sync(`${OUTPUT_BASE_FOLDER}/${VIEWS_FOLDER}`)
    const allViews = await zesty.getViews()

    for (const view of allViews.data) {
      if (view.status === ENVIRONMENT_TO_USE) {
        // Create any nested folders needed if this is is an endpoint.
        if (view.fileName.startsWith('/')) {
          const lastSlash = view.fileName.lastIndexOf('/')
          if (lastSlash !== -1) {
            const deepPath = view.fileName.substring(0, lastSlash)
            mkdirp.sync(`${OUTPUT_BASE_FOLDER}/${VIEWS_FOLDER}/${deepPath}`)
          }
        }

        const fileSystemName = `${OUTPUT_BASE_FOLDER}/${VIEWS_FOLDER}/${view.fileName}${view.fileName.indexOf('.') == -1 ? TEMPLATE_FILE_EXTENSION : ''}`
        fs.writeFileSync(fileSystemName, view.code)
      }
    }    

    // Get all the scripts
    mkdirp.sync(`${OUTPUT_BASE_FOLDER}/${SCRIPTS_FOLDER}`)    
    const allScripts = await zesty.getScripts() 

    for (const script of allScripts.data) {
      if (script.status === ENVIRONMENT_TO_USE) {
        const fileSystemName = `${OUTPUT_BASE_FOLDER}/${SCRIPTS_FOLDER}/${script.fileName}${script.fileName.indexOf('.') === -1 ? SCRIPT_FILE_EXTENSION : ''}`
        fs.writeFileSync(fileSystemName, script.code)
      }
    }

    // Get all the stylesheets
    mkdirp.sync(`${OUTPUT_BASE_FOLDER}/${STYLES_FOLDER}`)
    const allStylesheets = await zesty.getStylesheets()

    for (const stylesheet of allStylesheets.data) {
      if (stylesheet.status === ENVIRONMENT_TO_USE) {
        const fileSystemName = `${OUTPUT_BASE_FOLDER}/${STYLES_FOLDER}/${stylesheet.fileName}${stylesheet.fileName.indexOf('.') === -1 ? STYLES_FILE_EXTENSION : ''}`
        fs.writeFileSync(fileSystemName, stylesheet.code)
      }
    }
  } catch (err) {
    console.log(err)
  }
} 

getInstanceData()