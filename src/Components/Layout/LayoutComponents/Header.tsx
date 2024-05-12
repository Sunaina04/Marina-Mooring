import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Dropdown } from 'primereact/dropdown'
import { HeaderProps } from '../../../Type/ComponentBasedType'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Store/Store'
import useMetaData from '../../CommonComponent/MetaDataComponent'
import { Role } from '../../../Type/CommonType'

const Header: React.FC<HeaderProps> = ({ header }) => {
  const userData = useSelector((state: any) => state.user?.userData)
  const isOpen = useSelector((state: RootState) => state.user.isOpen)
  const [expanded, setExpanded] = useState(false)
  const [selectRole, setSelectRole] = useState(userData?.role.name)
  const { getMetaData } = useMetaData()
  const [rolesData, setRolesData] = useState<Role[]>()

  const handleMenu = () => {
    setExpanded(!expanded)
  }

  const fetchDataAndUpdate = useCallback(async () => {
    const { rolesData } = await getMetaData()
    if (rolesData !== null) {
      setRolesData(rolesData)
    }
  }, [])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate])

  return (
    <div
      style={{
        background: '#FFFFFF',
        padding: '15px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        borderRadius: '0.5rem',
        fontSize: '18px',
        fontWeight: 600,
        textAlign: 'left',
        color: '#AEAEAE',
      }}>
      {header}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '300px' }}>
        <Dropdown
          value={selectRole}
          onChange={(e) => setSelectRole(e.value)}
          optionLabel="name"
          options={rolesData}
          editable
          style={{
            width: '150px',
            height: '4vh',
            border: '1px solid gray',
            borderRadius: '0.5rem',
            color: 'black',
          }}
        />
        {userData && (
          <>
            <Avatar image={'/assets/images/user.png'} />
            <span style={{ color: '#000000', fontSize: '16px', fontWeight: 400 }}>
              {userData.name}
            </span>{' '}
          </>
        )}
        <Button
          onClick={handleMenu}
          className="p-button-rounded p-button-outlined"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img
            src={expanded ? '/assets/images/angleDown.svg' : '/assets/images/angleDown.svg'}
            alt="angleDown"
            style={{ width: '12px', height: '10px' }}
          />
        </Button>
      </div>
    </div>
  )
}

export default Header
