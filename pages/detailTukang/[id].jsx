import { httpsCallable } from "firebase/functions";
import DetailTukang from "../../components/detailTukang"
import functions from "../../utils/firebase/function";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const DetailTukangPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState();
    const getData = async () => {
        const getUser = httpsCallable(functions, 'getUser');
        const user = await getUser(id);
        setUser(user.data);
    }
    useEffect(() => {
        getData();
    }, [id])
    return (
        <DetailTukang user={user} />
    )
}

export default DetailTukangPage