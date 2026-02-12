import { Avatar, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { selectedUserData, useStoreAuth, useStoreUsers } from '@/store'
import { FILE_DOWNLOAD } from '@/libs/env'
import { UserMeData } from '@/services'

type Props = {
  userData?: UserMeData | null
}

const SidebarProfile = ({ userData }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/users/profile', { replace: true })
  }

  return (
    <div
      className="flex flex-col gap-1 w-full px-4 pb-1  border-b border-gray-200 hover:bg-gray-50 cursor-pointer "
      onClick={handleClick}
    >
      <div className="w-full text-[16px] leading-6 font-medium">
        <div className="flex mb-2  gap-1  justify-start items-center w-full">
          <Avatar
            size={70}
            src={`${FILE_DOWNLOAD}${userData?.photo}`}
            icon={<FaUser size={55} />}
            style={{
              width: 95,
              height: 95,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          />
          <div className="mt-2 mb-2 font-semibold text-sm capitalize">
            <p className="text-sm font-semibold text-[#6e8bb7] capitalize  leading-4 mb-1">{userData?.fullName}</p>
            <Tag color="cyan" className="font-medium w-fit">
              {userData?.role?.name}
            </Tag>
          </div>
        </div>
        <span className="text-[12px] leading-3.5 py-1 px-2 bg-[#0077ff20] text-blue-600 font-semibold rounded-sm inline-block">
          {userData?.organisation?.name}
        </span>
        <p className="mt-0.5 leading-5 text-[12px] text-[#6e8bb7] font-semibold">
          {userData?.region && userData?.region?.name}
          {userData?.region && userData?.district && <br />}
          {userData?.region && userData?.district && userData?.district?.name}
        </p>
      </div>
    </div>
  )
}

export default SidebarProfile
