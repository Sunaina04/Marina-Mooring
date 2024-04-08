
import { DataTable } from "primereact/datatable";

import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../Customer/AddCustomer";
import AddMoorings from "./AddMoorings";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Moorings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
  ]);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };


  const [nodes, setNodes] = useState<TreeNode[]>([]);

  useEffect(() => {
      let files = [];

      for (let i = 0; i < 5; i++) {
          let node = {
              key: i,
              data: {
                  name: 'Item ' + i,
                  size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                  type: 'Type ' + i
              },
              children: [
                  {
                      key: i + ' - 0',
                      data: {
                          name: 'Item ' + i + ' - 0',
                          size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                          type: 'Type ' + i
                      }
                  }
              ]
          };

          files.push(node);
      }

      setNodes(files);
  }, []);



  return (
    <>
      {" "}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Moorings
          </h1>
        </div>
        <div className="flex gap-4 items-center mr-20 mt-14">


        <div>
          <div className="p-input-icon-left">
            <i className="pi pi-search text-[#D2D2D2]" />
            <InputText
              placeholder="Search"
              className="h-[5vh] cursor-pointer font-bold"
            />
          </div>
        </div>

          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
            style={{ borderRadius: "1rem", overflow: "hidden" }}
          >
            <AddMoorings />
          </CustomModal>
        </div>
      </div>
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[73vw] ml-20 mt-10">
      <div className="card">
            <TreeTable value={nodes}  tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>
        </div>
      </div>
    </>
  );
};

export default Moorings;
