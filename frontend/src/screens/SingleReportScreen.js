import Swal from 'sweetalert2'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReportDeetsById } from '../actions/userActions'
import { Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

const SingleReportScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const Report_Id = match.params.id

  // ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗    ███████╗████████╗ █████╗ ████████╗███████╗███████╗
  // ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝    ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
  // ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝     ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
  // ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗     ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
  // ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗    ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
  // ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const GET_REPORT_DEETS_BY_ID = useSelector(
    (state) => state.GET_REPORT_DEETS_BY_ID
  )
  const { Reportresult, loading, error } = GET_REPORT_DEETS_BY_ID

  // ███████╗████████╗ █████╗ ████████╗███████╗███████╗
  // ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
  // ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
  // ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
  // ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
  // ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

  // ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
  // ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
  // █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
  // ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
  // ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
  // ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

  // ██╗   ██╗███████╗███████╗    ███████╗███████╗███████╗███████╗ ██████╗████████╗
  // ██║   ██║██╔════╝██╔════╝    ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
  // ██║   ██║███████╗█████╗      █████╗  █████╗  █████╗  █████╗  ██║        ██║
  // ██║   ██║╚════██║██╔══╝      ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
  // ╚██████╔╝███████║███████╗    ███████╗██║     ██║     ███████╗╚██████╗   ██║'s
  //  ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getReportDeetsById(Report_Id))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])
  // ██████╗ ███████╗████████╗██╗   ██╗██████╗ ███╗   ██╗
  // ██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗████╗  ██║
  // ██████╔╝█████╗     ██║   ██║   ██║██████╔╝██╔██╗ ██║
  // ██╔══██╗██╔══╝     ██║   ██║   ██║██╔══██╗██║╚██╗██║
  // ██║  ██║███████╗   ██║   ╚██████╔╝██║  ██║██║ ╚████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

  return (
    <>
      <Row>
        <Col md={12}>
          <Link id='goback' onClick={() => history.goBack()}>
            <i class='fas fa-angle-double-right'></i>
          </Link>
        </Col>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          Reportresult && (
            <Col md={12}>
              {Reportresult.type === 'monthly' &&
                Reportresult.date.length === 18 && (
                  <h1 id='centerme' className='whitemee'>
                    {' '}
                    {Reportresult.date.substring(12)} סיכום חודשי לחודש{' '}
                  </h1>
                )}
              {Reportresult.type === 'monthly' &&
                Reportresult.date.length === 19 && (
                  <h1 id='centerme' className='whitemee'>
                    {' '}
                    {Reportresult.date.substring(11)} סיכום חודשי לחודש{' '}
                  </h1>
                )}
              {Reportresult.type === 'weekly' && (
                <h1 id='centerme' className='whitemee'>
                  {' '}
                  סיכום שבועי{' '}
                </h1>
              )}
              {Reportresult.type === 'daily' && (
                <h1 id='centerme' className='whitemee'>
                  {' '}
                  סיכום יומי{' '}
                </h1>
              )}

              {Reportresult.type === 'monthly' && (
                <h2 id='centerme' className='whitemee'>
                  {' '}
                  {Reportresult.date} לתאריכים{' '}
                </h2>
              )}
              {Reportresult.type === 'weekly' && (
                <h2 id='centerme' className='whitemee'>
                  {' '}
                  {Reportresult.date} לתאריכים{' '}
                </h2>
              )}
              {Reportresult.type === 'daily' && (
                <h2 id='centerme' className='whitemee'>
                  {' '}
                  {Reportresult.date} לתאריך{' '}
                </h2>
              )}
              <div id='rEportDeets'>
                <p> יוצר הסיכום </p>
                <p id='boldmeblack'> {Reportresult.owner.name} </p>
                <p> מספר ימי העבודה{'  '}</p>
                <p id='boldmeblack'>{Reportresult.numOfWorkDays}</p>
                <p> מספר תורים בסה"כ</p>
                <p id='boldmeblack'>{Reportresult.numAllTorim}</p>
                <p> מספר תורים שנקבעו </p>
                <p id='boldmeblack'> {Reportresult.numNOTAvilableTorim}</p>
                <p>מספר תורים פנויים</p>
                <p id='boldmeblack'>{Reportresult.numAvilableTorim}</p>
                <p>מספר תורים שבוטלו/לא הגיע/לא שילם</p>
                <p id='boldmeblack'>{Reportresult.numCanceledTorim}</p>
                <p>?האם סיכום זה הוגש לאחר התקופה המחושבת</p>
                <p id='boldmeblack'>{Reportresult.afterdate ? 'כן' : 'לא'} </p>
                <p>זמן הדיוו"ח </p>
                <p id='boldmeblack'>
                  בתאריך {Reportresult.createatDate} ,בשעה{' '}
                  {Reportresult.createdAtTime}
                </p>
              </div>

              <h2 id='centerme' className='whitemee'>
                {' '}
                הכנסות
              </h2>

              <Table bordered className='whiteme' id='tablewhite'>
                <thead id='centertext'>
                  <tr id='tableheadlines'>
                    <th>paybox</th>
                    <th>bit</th>
                    <th>אשראי</th>
                    <th>מזומן</th>
                    <th>סה"כ</th>
                  </tr>
                </thead>
                <tbody id='centertext'>
                  {Reportresult.moneyCount === 0 ? (
                    <Message> לא היו הכנסות בחודש זה</Message>
                  ) : (
                    <tr>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>{Reportresult.moneyCount}</td>
                      <td>{Reportresult.moneyCount}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <h2 id='centerme' className='whitemee'>
                {' '}
                פירוט וקבלות
              </h2>
              <Table className='whiteme' id='tablewhite'>
                <thead id='centertext'>
                  <tr id='tableheadlines'>
                    <th>סוג תשלום</th>
                    <th>מחיר</th>
                    <th>סוג טיפול</th>
                    <th>שעה</th>
                    <th>תאריך</th>
                  </tr>
                </thead>
                <tbody id='centertext'>
                  {Reportresult.clocks.length === 0 ? (
                    <Message> לא היו תורים בחודש עבודה זה </Message>
                  ) : (
                    Reportresult.clocks
                      .sort(
                        (a, b) =>
                          Date.parse(
                            new Date(a.date.split('/').reverse().join('-'))
                          ) -
                          Date.parse(
                            new Date(b.date.split('/').reverse().join('-'))
                          )
                      )
                      .map((clock) => (
                        <tr key={clock._id} id='hoverandblue'>
                          <td>מזומן</td>
                          <td>50</td>
                          <td>תספורת גבר</td>
                          <td>{clock.time}</td>
                          <td>{clock.date}</td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
            </Col>
          )
        )}
      </Row>
    </>
  )
}

export default SingleReportScreen
