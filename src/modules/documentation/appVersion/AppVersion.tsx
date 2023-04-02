import { useStringRepo } from '@/repository/stringRepo';
import { useEffect, useMemo } from 'react';
import { useAppVersionApi } from './repository/appVersionApi';
export default function AppVersion() {
    const appVersionApi = useAppVersionApi()
    const { dateUs } = useStringRepo()
    appVersionApi.get({ app_name: 'smartschool_web' })
    useEffect(() => {
        appVersionApi.get({ app_name: 'smartschool_web' })
    }, [])
    const appVersions = useMemo(() => appVersionApi.data, [appVersionApi])
    return (
        <div>
            <div className="bg-white p-2">
                Keterangan :
                <b>New</b> : Penambahan fitur. |
                <b>Change</b> : Perubahan fitur. |
                <b>BugFix</b> : Perbaikan fitur. |
                <b>Revamp</b> : Perubahan sebagian atau seluruhnya disertai dengan penambahan fitur.
            </div>
            {
                appVersions?.map((version) => (
                    <div className="mb-4" >
                        <h2 className="mb-0">
                            {'version - ' + version.version}
                        </h2>
                        <div className="mb-2">{dateUs(version.date)}</div>
                        <b>Changelog : </b>
                        <div dangerouslySetInnerHTML={{ __html: version.changelog }} ></div>
                    </div>
                ))
            }
        </div>
    )
}


