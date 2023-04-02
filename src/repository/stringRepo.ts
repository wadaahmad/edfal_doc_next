import { useMemo } from "react";

export function useStringRepo() {
    const dayIdn = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
    const monthIdn = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dayUs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthUs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const greeting = useMemo(() => {
        var today = new Date()
        var curHr = today.getHours()
        var greeting = ''

        if (curHr < 12) {
            greeting = 'Good morning'
        } else if (curHr < 18) {
            greeting = 'Good afternoon'
        } else {
            greeting = 'Good evening'
        }
        return greeting
    }, [])
    const yearNow = useMemo(() => {
        var d = new Date()
        return d.getFullYear()
    },[])
    const dateNowIdn = useMemo(() => {
        var myDate = new Date();
        let date = myDate.getDate();
        let month = monthIdn[myDate.getMonth()];
        let year = myDate.getFullYear();
        let day = dayIdn[myDate.getDay()];

        return `${date} ${month} ${year}`;
    },[])
    const dateTimeNow = useMemo(() => {
        //console.log("ref")
        var myDate = new Date();


        let date = myDate.getDate();
        let month = monthUs[myDate.getMonth()];
        let year = myDate.getFullYear();
        let day = dayUs[myDate.getDay()];

        let today = `${date} ${month} ${year}, ${day}`;

        let amOrPm;
        let twelveHours = function () {
            if (myDate.getHours() > 12) {
                amOrPm = 'PM';
                let twentyFourHourTime = myDate.getHours();
                let conversion = twentyFourHourTime - 12;
                return `${conversion}`

            } else {
                amOrPm = 'AM';
                return `${myDate.getHours()}`
            }
        };
        let hours = twelveHours();
        let minutes = myDate.getMinutes();

        let currentTime = `${hours}:${minutes} ${amOrPm}`;
        return today + ' ' + currentTime;

    },[])
    function capitalizeFirstLetter(string: String) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    function currency(value: any) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    function dateIdn(date: string) {
        var newDate = new Date(date)
        return dayIdn[newDate.getDay()] + ', ' + newDate.getDate() + ' ' + monthIdn[newDate.getMonth()] + ' ' + newDate.getFullYear()

    }
    function dateUs(date: string) {
        var newDate = new Date(date)
        return dayUs[newDate.getDay()] + ', ' + newDate.getDate() + ' ' + monthUs[newDate.getMonth()] + ' ' + newDate.getFullYear()

    }
    function intToRoman(num: any) {
        var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 },
            roman = '',
            i;
        for (i in lookup) {
            while (num >= lookup[i as keyof typeof lookup]) {
                roman += i;
                num -= lookup[i as keyof typeof lookup];
            }
        }
        return roman;
    }
    function charUrlFriendly(str: string) {
        return (str.replace(/[^\w\s]/gi, '')).replaceAll(' ', '-').toLowerCase()
    }
    return {
        greeting,
        monthIdn,
        yearNow,
        dateTimeNow,
        dateNowIdn,
        capitalizeFirstLetter,
        currency,
        dateIdn,
        dateUs,
        charUrlFriendly
    }
}