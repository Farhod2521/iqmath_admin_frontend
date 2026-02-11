import { useEffect, useState } from 'react'
import { DistrictType, getDistricts, getNeighborhoods, getRegions, NeighborhoodsType, RegionType } from '@/http'
import { Select, Space } from 'antd'
import { useAppSelector } from '@/hooks/useRedux'
import { selectUserMe } from '@/store/auth/authSlice'

type FilterType = {
  regionSoato?: string
  districtSoato?: string
  neighborhoodId?: string
}

type FAutoSelectWithStoreProp = {
  setFilterData: Function
  filterData: FilterType
}

function FAutoSelectWithStore({ filterData, setFilterData }: FAutoSelectWithStoreProp) {
  const userData = useAppSelector(selectUserMe)

  const [choose, setChoose] = useState({ chooseRegion: true, chooseDistric: true })

  const [regions, setRegions] = useState<RegionType[]>()
  const [districts, setDistricts] = useState<DistrictType[]>()
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodsType[]>()

  const getR = () => {
    getRegions().then((res) => {
      setRegions(res.regionsList)
    })
  }

  const getD = (soato: string) => {
    getDistricts(soato).then((res) => {
      setDistricts(res.districtsList)
    })
  }

  const getN = (r: string, d: string) => {
    getNeighborhoods({ region_soato: r, district_soato: d }).then((res) => {
      setNeighborhoods(res.neighborhoodsList)
    })
  }

  useEffect(() => {
    getR()

    if (userData?.position.region) {
      setChoose((prev) => ({
        ...prev,
        chooseRegion: false
      }))
    }
    if (userData?.position.region && userData.position.district) {
      setChoose({
        chooseRegion: false,
        chooseDistric: false
      })
    }

    if (filterData.regionSoato) {
      getD(filterData.regionSoato)
    }
    if (filterData.regionSoato && filterData.districtSoato) {
      getN(filterData.regionSoato, filterData.districtSoato)
    }
  }, [])

  const handleChangeRegion = (e: string) => {
    setFilterData({
      regionSoato: e,
      districtSoato: undefined,
      neighborhoodId: undefined
    })
    getD(e)
  }
  const handleChangeDistrict = (e: string) => {
    setFilterData({
      districtSoato: e,
      neighborhoodId: undefined
    })
    filterData.regionSoato && getN(filterData.regionSoato, e)
  }

  const handleChangeNeighborhood = (e: string) => {
    setFilterData({
      neighborhoodId: e
    })
  }

  return (
    <Space>
      <Select
        disabled={!choose.chooseRegion}
        style={{ width: 160 }}
        placeholder="Viloyat"
        allowClear
        showSearch
        value={filterData?.regionSoato}
        options={regions?.map((i) => ({ label: i.name, value: i.soato }))}
        onChange={handleChangeRegion}
        filterOption={(input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase())}
      />
      <Select
        disabled={!filterData?.regionSoato || !choose.chooseDistric}
        style={{ width: 160 }}
        placeholder="Tuman"
        allowClear
        showSearch
        value={filterData?.districtSoato}
        options={districts?.map((i) => ({ label: i.name, value: i.soato }))}
        onChange={handleChangeDistrict}
        filterOption={(input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase())}
      />
      <Select
        disabled={!filterData?.districtSoato}
        style={{ width: 160 }}
        placeholder="Mahalla"
        allowClear
        showSearch
        value={filterData?.neighborhoodId}
        options={neighborhoods?.map((i) => ({ label: i.name, value: i.id }))}
        onChange={handleChangeNeighborhood}
        filterOption={(input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase())}
      />
    </Space>
  )
}

export default FAutoSelectWithStore
