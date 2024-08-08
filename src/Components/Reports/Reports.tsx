import React, { useCallback, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'
import 'chart.js/auto'
import Header from '../Layout/LayoutComponents/Header'
import { properties } from '../Utils/MeassageProperties'
import styled from '@emotion/styled'
import { ServiceAreaData } from '../CommonComponent/MetaDataComponent/MetaDataApi'
import { MetaData } from '../../Type/CommonType'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../Store/Slice/userSlice'
import WorkOrders from '../Moorserve/WorkOrders/workOrders'

Chart.register(ArcElement, Tooltip, Legend)

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  margin: 20px 15px;
  flex-wrap: wrap;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const ChartCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 45%;
  max-width: 550px;
  text-align: center;
  transition: transform 0.2s;
  margin: 10px;

  &:hover {
    transform: translateY(-10px);
  }

  h2 {
    margin-bottom: -20px;
    font-size: 1.5rem;
    color: #333;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

const Report: React.FC = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [serviceAreaSelected, setServiceAreaSelected] = useState(false)
  const [jobTypeSelected, setJobTypeSelected] = useState(false)
  const [serviceArea, setServiceArea] = useState<MetaData[]>([])
  const [jobType, setJobType] = useState<MetaData[]>([])

  const { getServiceAreaData } = ServiceAreaData()

  const fetchMetaData = useCallback(async () => {
    const { serviceAreaData } = await getServiceAreaData()
    if (serviceAreaData !== null) {
      setServiceArea(serviceAreaData)
    }
    if (serviceAreaData !== null) {
      setJobType(serviceAreaData)
    }
  }, [getServiceAreaData])

  useEffect(() => {
    fetchMetaData()
  }, [selectedCustomerId])

  const getTotal = (data: MetaData[]) => {
    return data.reduce((acc, item) => acc + item.id, 0)
  }

  const jobTypeData: ChartData<'pie'> = {
    labels: jobType.map((item) => item?.serviceAreaName),
    datasets: [
      {
        label: 'Job Type',
        data: jobType.map((item) => item.id),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const serviceAreaData: ChartData<'pie'> = {
    labels: serviceArea.map((item) => item?.serviceAreaName),
    datasets: [
      {
        label: 'Service Area',
        data: serviceArea.map((item) => item.id),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { label, raw } = tooltipItem
            const total = getTotal(jobType)
            // const percentage = ((raw / total) * 100).toFixed(2)
            return `${label}: ${40}%`
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const label = jobType[index]?.serviceAreaName
        setJobTypeSelected(true)
        setServiceAreaSelected(true)
      }
    },
  }

  return (
    <>
      <Header header={properties.reportHeader} />
      <div className="ml-40">
        <ChartsContainer>
          <ChartCard>
            <h2>Job Type</h2>
            <Pie data={jobTypeData} options={chartOptions} />
          </ChartCard>
          <ChartCard>
            <h2>Service Area</h2>
            <Pie data={serviceAreaData} options={chartOptions} />
          </ChartCard>
        </ChartsContainer>
      </div>

      {jobTypeSelected && <WorkOrders report={true} />}
    </>
  )
}

export default Report
