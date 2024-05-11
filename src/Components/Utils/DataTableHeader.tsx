import { InputText } from 'primereact/inputtext'

export const TechniciansHeader = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="p-input-icon-left ">
        <InputText
          placeholder="Search by name, ID,Email,Role,phone no..."
          className="h-[5vh] w-[42vw] cursor-pointer text-[0.65rem] border-1 border-[1px] border-[#D5E1EA] rounded-md pl-10 pr-10"
          style={{ minHeight: '5vh' }}
        />
        <img
          src="/assets/images/Search.svg"
          alt="Search Icon"
          className="p-clickable"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
          }}
        />
      </div>
      <span className="border-[1px] border-[#D5E1EA] w-[42vw] mt-3 "></span>
    </div>
  )
}

export const CustomersHeader = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="p-input-icon-left">
        <InputText
          placeholder="Search by name, ID, phone no..."
          className="h-[5vh] w-[28vw] cursor-pointer text-[0.65rem] border-1 border-[1px] border-[#D5E1EA] rounded-md pl-10 pr-10"
          // style={{ color: '#A4A4A4' }}
        />
        <img
          src="/assets/images/Search.svg"
          alt="Search Icon"
          className="p-clickable"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
          }}
        />
      </div>
      <span className="border-[1px] border-[#D5E1EA] w-[28vw] mt-3 "></span>
    </div>
  )
}
