import { useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
function App() {
  const [search,setsearch]=useState('');
  const [limit,setlimit]=useState(10);
  const [page,setpage]=useState(1);
  const [userdata, setUserdata] = useState([]);

  const [showtech, setShowtech] = useState(false);
  const [showfellow, setShowfellow] = useState(false);
  const [showcourse, setShowcourse] = useState(false);

  useEffect(() => {
    console.log('k');
    async function fetchData() {
      try {
        const response = await fetch('https://campus-api.terv.pro/api/adminReport/getAdminEnquiryReport/userId=605b53fdd0fc911042558ffe', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'limit':limit,'pageIndex':page,'searchkey':search})
        });
        const json = await response.json();
        setUserdata(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [search,page,limit]);

  return (
    <>
    <div className="container-fluid">
    <div className="d-flex justify-content-between">
      <div className='col-4'>
        <h3 className='text-center'>Techruit Details</h3>
        <div className="p-3 bg-primary text-white rounded-3 shadow flex-fill m-2 text-center">
          Total Techruit Count - {userdata.techruitTotalCount}<br/>
          Techruit Count - {userdata.techruitCount}
        </div>
      </div>

      <div className='col-4'>
        <h3 className='text-center'>Fellowship Details</h3>
        <div className="p-3 bg-success text-white rounded-3 shadow flex-fill m-2 text-center">
          Total Fellowship Count - {userdata.fellowshipTotalCount}<br/>
          Fellowship Count - {userdata.fellowshipCount}
        </div>
      </div>

      <div className='col-4'>
        <h3 className='text-center'>Courses Details</h3>
        <div className="p-3 bg-secondary text-white rounded-3 shadow flex-fill m-2 text-center">
          Total Courses Count - {userdata.coursesTotalCount}<br/>
          Courses Count - {userdata.coursesCount}
        </div>
      </div>
    </div>
  </div>

<br/><br/>

    <div className='col col-12 text-end'>
      <label htmlFor="searchkey">Search Key : </label>
      <input type='text' name='searchkey' value={search} onChange={(e)=>setsearch(e.target.value)} className='rounded-4 ps-3 ms-2' placeholder='enter any keyword'/>
    </div>

<br/><br/>

     {search.length>0?
     <div className='container col-9'>
      <div className='d-flex justify-content-between'>
        <div className='com-md-3 p-2'>
          <button className='btn btn-primary rounded-4' onClick={()=>(setShowtech(true),setShowcourse(false),setShowfellow(false))}>Tecruit List</button>
        </div>
        <div className='com-md-3 p-2'>
          <button className='btn btn-primary rounded-4' onClick={()=>(setShowtech(false),setShowcourse(false),setShowfellow(true))}>Fellowship List</button>
        </div>
        <div className='com-md-3 p-2'>
          <button className='btn btn-primary rounded-4' onClick={()=>(setShowtech(false),setShowcourse(true),setShowfellow(false))}>Courses List</button>
        </div>
      </div>
     </div>:null}


      {(search.length>0 && showtech)?
      <div>
        <table className='table table-bordered'>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile</td>
          </tr>
          {userdata.techruitList.map((list,index)=><tr key={index}>
            <td>{list.name}</td>
            <td>{list.emailId}</td>
            <td>{list.mobileNo}</td>
          </tr>)}
        </table>
        <div className='row'>
          <div className='col text-start'>
            <label htmlFor='limit'>Limit : </label>
            <input type='number' name='limit' value={limit} onChange={(e)=>setlimit(parseInt(e.target.value))}/>
          </div>
          <div className='col text-end'>
            <label htmlFor='page'>Page : </label>
            <input type='number' name='page' value={page} onChange={(e)=>setpage(parseInt(e.target.value))}/>
          </div>
        </div>
      </div>:null}

      {(search.length>0 && showfellow)?
      <div>
        <table className='table table-bordered'>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile</td>
          </tr>
          {userdata.fellowshipList.map((list,index)=><tr key={index}>
            <td>{list.name}</td>
            <td>{list.emailId}</td>
            <td>{list.mobileNo}</td>
          </tr>)}
        </table>
        <div className='row'>
          <div className='col text-start'>
            <label htmlFor='limit'>Limit : </label>
            <input type='number' name='limit' value={limit} onChange={(e)=>setlimit(parseInt(e.target.value))}/>
          </div>
          <div className='col text-end'>
            <label htmlFor='page'>Page : </label>
            <input type='number' name='page' value={page} onChange={(e)=>setpage(parseInt(e.target.value))}/>
          </div>
        </div>
      </div>:null}

      {(search.length>0 && showcourse)?
      <div>
        <table className='table table-bordered'>
          <tr className=''>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
          {userdata.coursesList.map((list,index)=><tr key={index}>
            <td>{list.name}</td>
            <td>{list.emailId}</td>
            <td>{list.mobileNo}</td>
          </tr>)}
        </table>
        <div className='row'>
          <div className='col text-start'>
            <label htmlFor='limit'>Limit : </label>
            <input type='number' name='limit' value={limit} onChange={(e)=>setlimit(parseInt(e.target.value))}/>
          </div>
          <div className='col text-end'>
            <label htmlFor='page'>Page : </label>
            <input type='number' name='page' value={page} onChange={(e)=>setpage(parseInt(e.target.value))}/>
          </div>
        </div>
      </div>:null}

    </>
  )
}

export default App
