import React, { useState, useRef } from 'react'
import './SpeedDial.css'
import print from 'print-js'

const SpeedDial = () => {
  const [showOptions, setshowOptions] = useState(false)
  const showOptionsNow = () => {
    setshowOptions(!showOptions)
  }

  return (
    <>
      <div id='theAllPackage'>
        <div onClick={showOptionsNow} id='speedDialMENU'>
          <i class='fas fa-plus'></i>
        </div>

        {showOptions && (
          <div id='posibiletis'>
            <div id='speedDialShare'>
              <i id='Ismall' class='fas fa-share-alt'></i>
            </div>
            <div id='speedDialDownload'>
              <i id='Ismall' class='fas fa-file-download'></i>
            </div>
            <div>
              <div id='speedDialPrint'>
                <i id='Ismall' class='fas fa-print'></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

SpeedDial.displayName = 'SpeedDial'

export default SpeedDial
