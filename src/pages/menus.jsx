import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import folder from '../images/Icon.png';
import subMenu from '../images/icon-title.png';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (path) => {
        setOpenFolders((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const folderStructure = [
        {
            name: "System Management",
            children: [
                {
                    name: "Systems",
                    children: [
                        { name: "System Code" },
                        { name: "Code Registration" },
                        { name: "Code Registration - 2" },
                        { name: "Properties" },
                        {
                            name: "Menus",
                            children: [{ name: "Menu Registration" }]
                        },
                        {
                            name: "API List",
                            children: [
                                { name: "API Registration" },
                                { name: "API Edit" }
                            ]
                        }
                    ]
                },
                {
                    name: "Users & Groups",
                    children: [
                        {
                            name: "Users",
                            children: [{ name: "User Account Registration" }]
                        },
                        {
                            name: "Groups",
                            children: [{ name: "User Group Registration" }]
                        }
                    ]
                },
                { name: "사용자 승인", children: [{ name: "사용자 승인 상세" }] }
            ]
        }
    ];

    const renderFolderStructure = (folders, path = "") => {
        return folders.map((folder, index) => {
            const currentPath = `${path}/${folder.name}`;
            const isOpen = openFolders[currentPath];

            return (
                <div key={currentPath} style={{ paddingLeft: '20px', borderLeft: '1px solid #ddd', marginTop: '5px' }}>
                    <div
                        onClick={() => folder.children && toggleFolder(currentPath)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        {folder.children && (
                            <span style={{ marginRight: '8px' }}>{isOpen ? '▼' : '▶'}</span>
                        )}
                        <span>{folder.name}</span>
                    </div>
                    {isOpen && folder.children && (
                        <div style={{ paddingLeft: '20px' }}>
                            {renderFolderStructure(folder.children, currentPath)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-2">
                            <div className="mb-4 sm:mb-0 flex gap-2 items-center">
                                <img src={folder} alt="Folder-icon" style={{ width: '30px' }} />
                                <span>Menus</span>
                            </div>
                        </div>

                        <div className="sm:flex sm:justify-between sm:items-center mb-2">
                            <div className="mb-4 sm:mb-0 flex gap-3 items-center">
                                <img src={subMenu} alt="SubMenu" />
                                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Menus</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <Dropdown data-bs-theme="light" style={{ width: '60%' }}>
                                    <Dropdown.Toggle className='d-flex justify-content-between w-100 py-3' style={{ backgroundColor: '#e1e1df', color: 'black' }} id="dropdown-button-light-example1">
                                        System Management
                                    </Dropdown.Toggle>

                                    {/* <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" active>
                                            Action
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                                    </Dropdown.Menu> */}
                                </Dropdown>

                                <div className='mt-4'>
                                    {renderFolderStructure(folderStructure)}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Form.Group className="mb-3" controlId="menuId">
                                    <Form.Label>Menu ID</Form.Label>
                                    <Form.Control type="text" placeholder="654654e6-6a23-11ed-asdf-asd234afas4" className='rounded-4 px-3 border-0 py-3' style={{ backgroundColor: '#e1e1df', color: 'black' }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="depth">
                                    <Form.Label>Depth</Form.Label>
                                    <Form.Control type="text" placeholder="3" className='rounded-4 px-3 border-0 py-3' style={{ backgroundColor: '#e1e1df', color: 'black', width: '300px' }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="parentData">
                                    <Form.Label>Parent Data</Form.Label>
                                    <Form.Control type="text" placeholder="Systems" className='rounded-4 px-3 border-0 py-3' style={{ backgroundColor: '#efefef', color: 'black', width: '300px' }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Systems Code" className='rounded-4 px-3 border-0 py-3' style={{ backgroundColor: '#efefef', color: 'black', width: '300px' }} />
                                </Form.Group>

                                <Button variant="primary" className="rounded-5 py-2" style={{ width: '50%' }}>Save</Button>
                            </div>
                        </div>
                    </div>
                </main>

                <Banner />
            </div >
        </div >
    );
}

export default Dashboard;
