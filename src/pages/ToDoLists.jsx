import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Select from 'react-select';

const dummyData = {
    data1: [
        {
            "ticketTitle": "Test Kerja",
            "ticketType": "Task",
            "assigned": "Richard",
            "label": "To Do",
            "subLabel": "Task",
            "project": " ECare Phase 2",
            "feature": "Emergency Service",
            "task": "Layout",
            "dueDate": "2023-11-21",
            "desc": "None",
            "id": "nomor-31-1700471614090"
        }
    ],
    data2: [
        {
            "ticketTitle": "Test Kerja (Selesai)",
            "ticketType": "Task",
            "assigned": "Richard",
            "label": "Doing",
            "subLabel": "Task",
            "project": " ECare Phase 2",
            "feature": "Emergency Service",
            "task": "Layout & API",
            "dueDate": "2023-11-21",
            "desc": "None",
            "id": "nomor-31-1700471614094"
        }
    ]
}
const dummyDataTitle = {
    title: ["To Do", "Doing"]
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    background: isDragging ? "#f2f2f2" : "",
    border: 'none',
    borderRadius: '18px',
    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    marginLeft: '10px',
    marginRight: '10px',
    padding: grid,
    width: 420
});

export default function QuoteApp() {
    const [data, setData] = useState([
        dummyData.data1, 
        dummyData.data2
    ]);
    const [dataForm, setDataForm] = useState({
        ticketTitle: '',
        ticketType: '',
        assigned: '',
        label: '',
        subLabel: '',
        project: '',
        feature: '',
        task: '',
        dueDate: '',
        desc: '',
    })

    const [selectedOption, setSelectedOption] = useState(null);

    // OPTIONS SELECT
    const optionsTicketType = [
        { value: 'Task', label: 'Task' },
        { value: 'Bug', label: 'Bug' },
    ];
    const optionsLabel = [
        { value: 'To Do', label: 'To Do' },
        { value: 'Doing', label: 'Doing' },
    ];
    const optionsSubLabel = [
        { value: 'Task', label: 'Task' },
        { value: 'Bug', label: 'Bug' },
    ];
    const optionsProject = [
        { value: ' ECare Phase 2', label: ' ECare Phase 2' },
        { value: ' ECare Phase 3', label: ' ECare Phase 3' },
    ];
    const optionsFeature = [
        { value: 'Emergency Service', label: 'Emergency Service' },
    ];
    const optionsTask = [
        { value: 'Layout', label: 'Layout' },
        { value: 'Layout & API', label: 'Layout & API' },
    ];
    // END OPTIONS SELECT

    const submitForm = () => {
        dataForm.id = `nomor-${Math.floor((Math.random() * 100) + 1)}-${new Date().getTime()}`
        if (dataForm.label === 'Doing') {
            const newState = [...data];
            newState[1].push(dataForm);
            setData(
                newState
            );
        }else {
            const newState = [...data];
            newState[0].push(dataForm);
            setData(
                newState
            );
        }
    }

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        console.log(sInd, dInd);
        if (sInd === dInd) {
            const items = reorder(data[sInd], source.index, destination.index);
            const newState = [...data];
            newState[sInd] = items;
            setData(newState);
        } else {
            const result = move(data[sInd], data[dInd], source, destination);
            const newState = [...data];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            setData(newState);
        }
    }

    return (
        <div>
            <button
                className="btn btn-primary m-2 mx-4"
                type="button"
                data-bs-toggle="modal" 
                data-bs-target="#modalAddToDo"
            >
                Add new item
            </button>

            <div style={{ display: "flex" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {data?.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {/* Title */}
                                    <div className="m-2 mb-3 d-flex">
                                        <h1 className="mb-0 p-2 rounded w-25 fs-6 text-center" style={{background: '#A09AFF'}}>{dummyDataTitle.title[ind]}</h1>
                                        <span className="align-self-center fw-bold ms-2" style={{color: '#A09AFF'}}>{el.length}</span>
                                    </div>
                                    {/* END Title */}

                                    {el?.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div className="card m-2" 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div className="card-body">
                                                        <div className="container">
                                                            <div className="row mb-2">
                                                                <div className="col-4">
                                                                    <div className="text-center rounded py-1 px-1" style={{background: 'rgba(255,193,7, 0.3)'}}>
                                                                        <p className="mb-0" style={{color: '#ffc107', fontSize: '14px'}}>Front End</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12">
                                                                    {/* <p className="fs-6 fw-bold">[eCare][Booking] - Kendala Voucher tidak bisa memilih kembali.</p> */}
                                                                    <p className="fs-6 fw-bold">{item.ticketTitle}</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <label style={{fontSize: '12px'}}>Feature</label>
                                                                    <p style={{fontSize: '14px'}}>{item.feature}</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label style={{fontSize: '12px'}}>Task</label>
                                                                    <p style={{fontSize: '14px'}}>{item.task}</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label style={{fontSize: '12px'}}>Resource</label>
                                                                    <p style={{fontSize: '14px'}}>{item.assigned}</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label style={{fontSize: '12px'}}>Due Date</label>
                                                                    <p style={{fontSize: '14px'}}>{item.dueDate}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

            {/* MODALS */}
            <div className="modal fade" id="modalAddToDo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Tiket</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="inputTicketTitle" className="form-label">Ticket Title</label>
                                        <input type="text" className="form-control" id="inputTicketTitle"
                                            onChange={(e) => setDataForm({ ...dataForm, 'ticketTitle': e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <Select
                                            defaultValue={dataForm.ticketType}
                                            onChange={(e) => setDataForm({ ...dataForm, 'ticketType': e.value })}
                                            options={optionsTicketType}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" id="inputTicketTitle" placeholder="Assigned To" 
                                            onChange={(e) => setDataForm({ ...dataForm, 'assigned': e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <textarea className="form-control" placeholder="Description (Optional)" id="floatingTextarea"
                                            onChange={(e) => setDataForm({ ...dataForm, 'desc': e.target.value })} ></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6 mb-3">
                                        <Select
                                            defaultValue={dataForm.label}
                                            onChange={(e) => setDataForm({ ...dataForm, 'label': e.value })}
                                            options={optionsLabel}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <Select
                                            defaultValue={dataForm.subLabel}
                                            onChange={(e) => setDataForm({ ...dataForm, 'subLabel': e.value })}
                                            options={optionsSubLabel}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <Select
                                            defaultValue={dataForm.project}
                                            onChange={(e) => setDataForm({ ...dataForm, 'project': e.value })}
                                            options={optionsProject}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <Select
                                            defaultValue={dataForm.feature}
                                            onChange={(e) => setDataForm({ ...dataForm, 'feature': e.value })}
                                            options={optionsFeature}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <Select
                                            defaultValue={dataForm.task}
                                            onChange={(e) => setDataForm({ ...dataForm, 'task': e.value })}
                                            options={optionsTask}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <input type="date" className="form-control" id="inputTicketTitle" placeholder="Date" onChange={(e) => setDataForm({ ...dataForm, 'dueDate': e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => submitForm()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* END MODALS */}
        </div>
    );
}