import { SimpleGrid, Text } from "@chakra-ui/react"
import LayoutDashboardTukang from "../../layout/LayoutDashboardTukang"
import CardPortofolio from "./cardPortofolio"

const PortofolioTukang = () => {
    return(
        <LayoutDashboardTukang pageTitle={'Portfolio'}>
            <Text fontSize={'24px'} fontWeight='600'>Riwayat Bangunan Yang Dikerjakan</Text>
            <SimpleGrid mt='40px' columns={2} spacing='20px'>
                <CardPortofolio />
                <CardPortofolio />
                <CardPortofolio />
                <CardPortofolio />
            </SimpleGrid>
        </LayoutDashboardTukang>
    )
}

export default PortofolioTukang