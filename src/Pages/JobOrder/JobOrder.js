import { FormDetail, DateForm, OptionForm } from '../../Components/FormDetail/FormDetail';
import './JobOrder.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ActionButton from '../../Components/ActionButton/ActionButton';
import ReactTable from '../../Components/Table/ReactTable';

export default function JobOrder({jobs, setJobs, products}) {
    const [productID, setProductID] = useState('PR001');
    const [batchNo, setBatchNo] = useState('');
    const [expiredDate, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [jobStatus, setJobStatus] = useState('Active');
    const productsID = products.map((product) => `${product.id}`);

    const [currentIndex, setCurrentIndex] = useState(null);

    const header = ["No", "ID Job", "ID Produk", "Batch No", "Expired Date", "Order Quantity", "Job Status"];

    function validateData(){
        return productID === "" || batchNo === "" || expiredDate === "" || quantity === "" || jobStatus === "";
    }

    function onClickRow(index){
        setCurrentIndex(index);
        
        const selectedData = jobs[index];
        setFormData(selectedData);
    }

    function saveData() {
        if (currentIndex !== null) {
            const updatedData = {
                id: jobs[currentIndex].id,
                productID: productID,
                batchNo: batchNo,
                expiredDate: expiredDate,
                quantity: quantity,
                jobStatus: jobStatus,
              };
              const newData = [...jobs.slice(0, currentIndex), updatedData, ...jobs.slice(currentIndex + 1)];
              setJobs(newData);
        } else {
            const existingDataLength = jobs.length;
            const generatedID = `J${(existingDataLength+1).toString().padStart(3, "0")}`;
            const newData = {
                id : generatedID,
                productID : productID,
                batchNo : batchNo,
                expiredDate : expiredDate,
                quantity : quantity,
                jobStatus : jobStatus
            };
            setJobs([...jobs, newData]);
        }
    }

    function deleteData(){
        const newData = [...jobs.slice(0, currentIndex), ...jobs.slice(currentIndex+1)];
        setJobs(newData);
        setCurrentIndex(null);
        clearData();
    }

    function clearData(){
        setProductID('');
        setBatchNo('');
        setDate('');
        setQuantity('');
        setJobStatus('');
        setCurrentIndex(null);
    }
    
    function setFormData(data){
        setProductID(data.productID);
        setBatchNo(data.batchNo);
        setDate(data.expiredDate);
        setQuantity(data.quantity);
        setJobStatus(data.jobStatus);
    }

    return (
        <>
            <Link to="/">Back</Link>
            <h1 className='title'>Job Order</h1>
            <div>
                <form id='form'>
                    <OptionForm variableName='Produk' options={productsID} value={productID} setValue={(e)=>{setProductID(e)}}/>
                    <FormDetail variableName='Batch No' value={batchNo} setValue={(e)=>{setBatchNo(e)}}/>
                    <DateForm variableName='Expired Date' value={expiredDate} setValue={(e)=>{setDate(e)}}/>
                    <FormDetail variableName='Order Qty' value={quantity} setValue={(e)=>{setQuantity(e)}}/>
                    <OptionForm variableName='Job Status' options={['Active', 'Cancel', 'Suspended']} value={jobStatus} setValue={(e)=>{setJobStatus(e)}}/>
                </form>
            </div>
            <div id='buttonRow'>
                <ActionButton name={"Delete"} color='#ffa2a2' onClickFunction={deleteData} disabled={currentIndex === null}/>
                <div>
                    <ActionButton name={"Clear"} color='#fdff9b' onClickFunction={clearData}/>
                    <ActionButton name={"Save"} color='#b5f9b8' onClickFunction={saveData} disabled={validateData()}/>
                </div>
            </div>

            <div id='table'>
                <ReactTable headers={header} datas={jobs} currentIndex={null} onClickHandler={onClickRow}/>
            </div>
        </>
    );
}