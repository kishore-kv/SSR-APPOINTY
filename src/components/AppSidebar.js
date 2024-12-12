import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import {cilPlus,cilCircle,cilCalendar,cilTie,cilGift,cilTags,cilBan,cilUserFollow} from '@coreui/icons'

// sidebar nav config
import navigation from '../_nav'
import CustomDropDown from './customComponents/CustomDropDown';


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  //custom dropdown levels
  const dropdownItems = [
    { label: 'Appointment', icon: cilCalendar },
    { label: 'Service', icon: cilCircle },
    { label: 'Staff', icon:cilTie  },
    { label: 'Customer', icon: cilUserFollow },
    { label: 'Gift Certificate', icon: cilGift },
    { label: 'Discount Coupon', icon: cilTags },
    { label: 'Block Date/Time', icon: cilBan },
  ];

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
              <div><CustomDropDown toggleIcon={cilPlus} items={dropdownItems} /></div>
        </CSidebarBrand>
        {/* <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        /> */}
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
