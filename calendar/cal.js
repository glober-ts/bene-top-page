<!--

	//カレンダーのID／複数設置する場合に要設定

	var cal_Id = 'cal_0';

	

	var calObject = new Object();

	calObject[cal_Id] = new Object();

	

	//Xヵ月後のカレンダーを表示する場合 :: 1は当月

	var cal_display_month = 1;

	

	//定休日などはここで設定します。

	//calObject[cal_Id].day[ここに日にちを半角で] = クラス名;

	calObject[cal_Id].day = new Object();

	calObject[cal_Id].text = new Object();

	calObject[cal_Id].day["2011/9/19"] = "holyday";

	calObject[cal_Id].day["2011/9/23"] = "holyday";

	calObject[cal_Id].day["2011/10/10"] = "holyday";

	calObject[cal_Id].day["2011/11/3"] = "holyday";

	calObject[cal_Id].day["2011/11/23"] = "holyday";

	calObject[cal_Id].day["2011/12/23"] = "holyday";

	calObject[cal_Id].day["2011/12/27"] = "holyday";

	calObject[cal_Id].day["2011/12/28"] = "holyday";

	calObject[cal_Id].day["2011/12/29"] = "holyday";

	calObject[cal_Id].day["2011/12/30"] = "holyday";

	calObject[cal_Id].day["2012/1/2"] = "holyday";

	calObject[cal_Id].day["2012/1/3"] = "holyday";

	calObject[cal_Id].day["2012/1/4"] = "holyday";

	calObject[cal_Id].day["2012/1/5"] = "holyday";

	calObject[cal_Id].day["2012/1/9"] = "holyday";

	calObject[cal_Id].day["2012/3/2"] = "holyday";

	calObject[cal_Id].day["2012/3/20"] = "holyday";

	calObject[cal_Id].day["2012/4/25"] = "holyday";

	calObject[cal_Id].day["2012/4/30"] = "holyday";

	calObject[cal_Id].day["2012/5/3"] = "holyday";

	calObject[cal_Id].day["2012/5/4"] = "holyday";

	calObject[cal_Id].day["2012/7/16"] = "holyday";

	calObject[cal_Id].day["2012/8/13"] = "holyday";

	calObject[cal_Id].day["2012/8/14"] = "holyday";

	calObject[cal_Id].day["2012/8/15"] = "holyday";

	calObject[cal_Id].day["2012/8/16"] = "holyday";

	calObject[cal_Id].day["2012/9/17"] = "holyday";

	calObject[cal_Id].day["2012/10/8"] = "holyday";

	calObject[cal_Id].day["2012/11/23"] = "holyday";

	calObject[cal_Id].day["2012/12/24"] = "holyday";

	calObject[cal_Id].day["2012/12/28"] = "holyday";

	calObject[cal_Id].day["2012/12/31"] = "holyday";

	calObject[cal_Id].day["2013/1/1"] = "holyday";

	calObject[cal_Id].day["2013/1/2"] = "holyday";

	calObject[cal_Id].day["2013/1/3"] = "holyday";

	calObject[cal_Id].day["2013/1/4"] = "holyday";

	calObject[cal_Id].day["2013/1/14"] = "holyday";

	calObject[cal_Id].day["2013/2/11"] = "holyday";

	calObject[cal_Id].day["2013/3/20"] = "holyday";

	calObject[cal_Id].day["2013/4/29"] = "holyday";

	calObject[cal_Id].day["2013/5/3"] = "holyday";

	calObject[cal_Id].day["2013/5/6"] = "holyday";

	calObject[cal_Id].day["2013/7/15"] = "holyday";

	calObject[cal_Id].day["2013/8/13"] = "holyday";

	calObject[cal_Id].day["2013/8/14"] = "holyday";

	calObject[cal_Id].day["2013/8/15"] = "holyday";

	calObject[cal_Id].day["2013/8/16"] = "holyday";

	calObject[cal_Id].day["2013/9/16"] = "holyday";

	calObject[cal_Id].day["2013/9/23"] = "holyday";

	calObject[cal_Id].day["2013/10/14"] = "holyday";

	calObject[cal_Id].day["2013/11/4"] = "holyday";

	calObject[cal_Id].day["2013/12/23"] = "holyday";

	calObject[cal_Id].day["2013/12/27"] = "holyday";

	calObject[cal_Id].day["2013/12/30"] = "holyday";

	calObject[cal_Id].day["2013/12/31"] = "holyday";

	calObject[cal_Id].day["2014/1/1"] = "holyday";

	calObject[cal_Id].day["2014/1/2"] = "holyday";

	calObject[cal_Id].day["2014/1/3"] = "holyday";

	calObject[cal_Id].day["2014/1/13"] = "holyday";
	
	calObject[cal_Id].day["2014/2/11"] = "holyday";
	
	calObject[cal_Id].day["2014/3/21"] = "holyday";
	
	calObject[cal_Id].day["2014/4/29"] = "holyday";
	
	calObject[cal_Id].day["2014/5/5"] = "holyday";
	
	calObject[cal_Id].day["2014/5/6"] = "holyday";
	
	calObject[cal_Id].day["2014/7/21"] = "holyday";
	
	calObject[cal_Id].day["2014/8/13"] = "holyday";
	
	calObject[cal_Id].day["2014/8/14"] = "holyday";
	
	calObject[cal_Id].day["2014/8/15"] = "holyday";
	
	calObject[cal_Id].day["2014/9/15"] = "holyday";
	
	calObject[cal_Id].day["2014/9/23"] = "holyday";
	
	calObject[cal_Id].day["2014/10/13"] = "holyday";
	
	calObject[cal_Id].day["2014/11/3"] = "holyday";
	
	calObject[cal_Id].day["2014/11/24"] = "holyday";
	
	calObject[cal_Id].day["2014/12/23"] = "holyday";
	
	calObject[cal_Id].day["2014/12/29"] = "holyday";
	
	calObject[cal_Id].day["2014/12/30"] = "holyday";
	
	calObject[cal_Id].day["2014/12/31"] = "holyday";
	
	calObject[cal_Id].day["2015/1/1"] = "holyday";
	
	calObject[cal_Id].day["2015/1/2"] = "holyday";
	
	calObject[cal_Id].day["2015/1/12"] = "holyday";
	
	
	calObject[cal_Id].day["2015/2/11"] = "holyday";
	
	calObject[cal_Id].day["2015/4/29"] = "holyday";
	
	calObject[cal_Id].day["2015/5/4"] = "holyday";
	
	calObject[cal_Id].day["2015/5/5"] = "holyday";
	
	calObject[cal_Id].day["2015/5/6"] = "holyday";
	
	calObject[cal_Id].day["2015/7/20"] = "holyday";
	
	calObject[cal_Id].day["2015/8/13"] = "holyday";
	
	calObject[cal_Id].day["2015/8/14"] = "holyday";
	
	calObject[cal_Id].day["2015/9/21"] = "holyday";
	
	calObject[cal_Id].day["2015/9/22"] = "holyday";
	
	calObject[cal_Id].day["2015/9/23"] = "holyday";
	
	calObject[cal_Id].day["2015/10/12"] = "holyday";
	
	calObject[cal_Id].day["2015/11/3"] = "holyday";
	
	calObject[cal_Id].day["2015/11/23"] = "holyday";
	
	calObject[cal_Id].day["2015/12/23"] = "holyday";
	
	calObject[cal_Id].day["2015/12/28"] = "holyday";
	
	calObject[cal_Id].day["2015/12/29"] = "holyday";
	
	calObject[cal_Id].day["2015/12/30"] = "holyday";	

	calObject[cal_Id].day["2015/12/31"] = "holyday";

	
	calObject[cal_Id].day["2016/1/1"] = "holyday";
	
	calObject[cal_Id].day["2016/1/11"] = "holyday";
	

	

	
	calObject[cal_Id].day["2016/2/11"] = "holyday";

	calObject[cal_Id].day["2016/3/21"] = "holyday";

	
	calObject[cal_Id].day["2016/4/29"] = "holyday";
	
	calObject[cal_Id].day["2016/5/2"] = "holyday";
	
	calObject[cal_Id].day["2016/5/3"] = "holyday";
	
	calObject[cal_Id].day["2016/5/4"] = "holyday";
	
	calObject[cal_Id].day["2016/5/5"] = "holyday";
	
	calObject[cal_Id].day["2016/7/18"] = "holyday";
	
	calObject[cal_Id].day["2016/8/11"] = "holyday";

	calObject[cal_Id].day["2016/8/12"] = "holyday";

	calObject[cal_Id].day["2016/8/15"] = "holyday";
	
	calObject[cal_Id].day["2016/8/16"] = "holyday";
	
	calObject[cal_Id].day["2016/9/19"] = "holyday";
	
	calObject[cal_Id].day["2016/9/22"] = "holyday";
	
	calObject[cal_Id].day["2016/10/10"] = "holyday";
	
	calObject[cal_Id].day["2016/11/3"] = "holyday";
	
	calObject[cal_Id].day["2016/11/23"] = "holyday";
	
	calObject[cal_Id].day["2016/12/23"] = "holyday";
	
	calObject[cal_Id].day["2016/12/27"] = "holyday";	
	calObject[cal_Id].day["2016/12/28"] = "holyday";
	
	calObject[cal_Id].day["2016/12/29"] = "holyday";
	
	calObject[cal_Id].day["2016/12/30"] = "holyday";	

	calObject[cal_Id].day["2016/12/31"] = "holyday";

	
	calObject[cal_Id].day["2017/1/1"] = "holyday";
	
	calObject[cal_Id].day["2017/1/2"] = "holyday";

	calObject[cal_Id].day["2017/1/3"] = "holyday";



	calObject[cal_Id].day["2017/1/9"] = "holyday";

	calObject[cal_Id].day["2017/3/20"] = "holyday";

	calObject[cal_Id].day["2017/5/3"] = "holyday";

	calObject[cal_Id].day["2017/5/4"] = "holyday";

	calObject[cal_Id].day["2017/5/5"] = "holyday";

	calObject[cal_Id].day["2017/7/17"] = "holyday";

	calObject[cal_Id].day["2017/8/11"] = "holyday";


	calObject[cal_Id].day["2017/8/14"] = "holyday";

	calObject[cal_Id].day["2017/8/15"] = "holyday";

	calObject[cal_Id].day["2017/8/16"] = "holyday";
	calObject[cal_Id].day["2017/8/23"] = "holyday2";
	calObject[cal_Id].day["2017/8/30"] = "holyday2";
	calObject[cal_Id].day["2017/9/6"] = "holyday2";
	calObject[cal_Id].day["2017/9/13"] = "holyday2";

	calObject[cal_Id].day["2017/9/18"] = "holyday";
	calObject[cal_Id].day["2017/9/20"] = "holyday2";
	calObject[cal_Id].day["2017/9/27"] = "holyday2";

	calObject[cal_Id].day["2017/10/4"] = "holyday2";

	calObject[cal_Id].day["2017/10/9"] = "holyday";

	calObject[cal_Id].day["2017/10/11"] = "holyday2";

	calObject[cal_Id].day["2017/10/25"] = "holyday2";


	calObject[cal_Id].day["2017/10/16"] = "holyday";
	calObject[cal_Id].day["2017/10/17"] = "holyday";
	calObject[cal_Id].day["2017/10/18"] = "holyday";




	calObject[cal_Id].day["2017/11/3"] = "holyday";

	calObject[cal_Id].day["2017/11/23"] = "holyday";

	calObject[cal_Id].day["2017/12/27"] = "holyday";

	calObject[cal_Id].day["2017/12/28"] = "holyday";

	calObject[cal_Id].day["2017/12/29"] = "holyday";

	calObject[cal_Id].day["2018/1/1"] = "holyday";
	calObject[cal_Id].day["2018/1/2"] = "holyday";
	calObject[cal_Id].day["2018/1/3"] = "holyday";



	calObject[cal_Id].day["2018/1/8"] = "holyday";

	calObject[cal_Id].day["2018/2/12"] = "holyday";

	calObject[cal_Id].day["2018/3/21"] = "holyday";

	calObject[cal_Id].day["2018/4/30"] = "holyday";

	calObject[cal_Id].day["2018/5/3"] = "holyday";
	calObject[cal_Id].day["2018/5/4"] = "holyday";

	calObject[cal_Id].day["2018/7/16"] = "holyday";

	calObject[cal_Id].day["2018/8/13"] = "holyday";
	calObject[cal_Id].day["2018/8/14"] = "holyday";
	calObject[cal_Id].day["2018/8/15"] = "holyday";
	calObject[cal_Id].day["2018/8/16"] = "holyday";

	calObject[cal_Id].day["2018/9/17"] = "holyday";
	calObject[cal_Id].day["2018/9/24"] = "holyday";

	calObject[cal_Id].day["2018/10/8"] = "holyday";

	calObject[cal_Id].day["2018/11/23"] = "holyday";

	calObject[cal_Id].day["2018/12/24"] = "holyday";

	calObject[cal_Id].day["2018/12/28"] = "holyday";


	calObject[cal_Id].day["2019/1/1"] = "holyday";
	calObject[cal_Id].day["2019/1/2"] = "holyday";
	calObject[cal_Id].day["2019/1/3"] = "holyday";
	calObject[cal_Id].day["2019/1/4"] = "holyday";

	calObject[cal_Id].day["2019/1/14"] = "holyday";


	calObject[cal_Id].day["2019/2/11"] = "holyday";

	calObject[cal_Id].day["2019/3/21"] = "holyday";

	calObject[cal_Id].day["2019/4/29"] = "holyday";
	calObject[cal_Id].day["2019/4/30"] = "holyday";
	calObject[cal_Id].day["2019/5/1"] = "holyday";
	calObject[cal_Id].day["2019/5/2"] = "holyday";
	calObject[cal_Id].day["2019/5/3"] = "holyday";
	calObject[cal_Id].day["2019/5/6"] = "holyday";

	calObject[cal_Id].day["2019/7/15"] = "holyday";

	calObject[cal_Id].day["2019/8/12"] = "holyday";
	calObject[cal_Id].day["2019/8/13"] = "holyday";
	calObject[cal_Id].day["2019/8/14"] = "holyday";
	calObject[cal_Id].day["2019/8/15"] = "holyday";
	calObject[cal_Id].day["2019/8/16"] = "holyday";

	calObject[cal_Id].day["2019/9/16"] = "holyday";
	calObject[cal_Id].day["2019/9/23"] = "holyday";

	calObject[cal_Id].day["2019/10/14"] = "holyday";
	calObject[cal_Id].day["2019/10/22"] = "holyday";

	calObject[cal_Id].day["2019/11/4"] = "holyday";

	calObject[cal_Id].day["2019/12/27"] = "holyday";
	calObject[cal_Id].day["2019/12/30"] = "holyday";
	calObject[cal_Id].day["2019/12/31"] = "holyday";

	calObject[cal_Id].day["2020/1/1"] = "holyday";
	calObject[cal_Id].day["2020/1/2"] = "holyday";
	calObject[cal_Id].day["2020/1/3"] = "holyday";
	calObject[cal_Id].day["2020/1/4"] = "holyday";
	calObject[cal_Id].day["2020/1/5"] = "holyday";

	calObject[cal_Id].day["2020/1/13"] = "holyday";

	calObject[cal_Id].day["2020/2/11"] = "holyday";
	calObject[cal_Id].day["2020/2/24"] = "holyday";


	calObject[cal_Id].day["2020/3/20"] = "holyday";

	calObject[cal_Id].day["2020/4/29"] = "holyday";


	calObject[cal_Id].day["2020/5/4"] = "holyday";
	calObject[cal_Id].day["2020/5/5"] = "holyday";
	calObject[cal_Id].day["2020/5/6"] = "holyday";

	calObject[cal_Id].day["2020/7/23"] = "holyday";
	calObject[cal_Id].day["2020/7/24"] = "holyday";

	calObject[cal_Id].day["2020/8/10"] = "holyday";
	calObject[cal_Id].day["2020/8/13"] = "holyday";
	calObject[cal_Id].day["2020/8/14"] = "holyday";

	calObject[cal_Id].day["2020/9/21"] = "holyday";
	calObject[cal_Id].day["2020/9/22"] = "holyday";


	calObject[cal_Id].day["2020/11/3"] = "holyday";
	calObject[cal_Id].day["2020/11/23"] = "holyday";

	calObject[cal_Id].day["2020/12/28"] = "holyday";
	calObject[cal_Id].day["2020/12/29"] = "holyday";
	calObject[cal_Id].day["2020/12/30"] = "holyday";
	calObject[cal_Id].day["2020/12/31"] = "holyday";

	calObject[cal_Id].day["2021/1/1"] = "holyday";
	calObject[cal_Id].day["2021/1/2"] = "holyday";
	calObject[cal_Id].day["2021/1/3"] = "holyday";
	calObject[cal_Id].day["2021/1/4"] = "holyday";
	calObject[cal_Id].day["2021/1/11"] = "holyday";


	calObject[cal_Id].day["2021/2/23"] = "holyday";


	calObject[cal_Id].day["2021/2/23"] = "holyday";
	
	calObject[cal_Id].day["2021/4/29"] = "holyday";
	
	calObject[cal_Id].day["2021/5/3"] = "holyday";
	calObject[cal_Id].day["2021/5/4"] = "holyday";
	calObject[cal_Id].day["2021/5/5"] = "holyday";
	
	calObject[cal_Id].day["2021/7/22"] = "holyday";
	calObject[cal_Id].day["2021/7/23"] = "holyday";
	
	calObject[cal_Id].day["2021/8/9"] = "holyday";
	calObject[cal_Id].day["2021/8/13"] = "holyday";
	calObject[cal_Id].day["2021/8/16"] = "holyday";
	
	calObject[cal_Id].day["2021/9/20"] = "holyday";
	calObject[cal_Id].day["2021/9/23"] = "holyday";
	
	calObject[cal_Id].day["2021/11/3"] = "holyday";
	calObject[cal_Id].day["2021/11/23"] = "holyday";
	
	calObject[cal_Id].day["2021/12/28"] = "holyday";
	calObject[cal_Id].day["2021/12/29"] = "holyday";
	calObject[cal_Id].day["2021/12/30"] = "holyday";
	calObject[cal_Id].day["2021/12/31"] = "holyday";
	
    calObject[cal_Id].day["2022/1/3"] = "holyday";
	calObject[cal_Id].day["2022/1/4"] = "holyday";
	calObject[cal_Id].day["2022/1/10"] = "holyday";
	
	


	calObject[cal_Id].day["2022/2/11"] = "holyday";


	calObject[cal_Id].day["2022/2/23"] = "holyday";
	
	calObject[cal_Id].day["2022/3/21"] = "holyday";
	
	calObject[cal_Id].day["2022/4/29"] = "holyday";
	
	calObject[cal_Id].day["2022/5/2"] = "holyday";
	calObject[cal_Id].day["2022/5/3"] = "holyday";
	calObject[cal_Id].day["2022/5/4"] = "holyday";
	calObject[cal_Id].day["2022/5/5"] = "holyday";
	
	calObject[cal_Id].day["2022/7/18"] = "holyday";
	
	calObject[cal_Id].day["2022/8/11"] = "holyday";
	calObject[cal_Id].day["2022/8/15"] = "holyday";
	calObject[cal_Id].day["2022/8/16"] = "holyday";
	
	calObject[cal_Id].day["2022/9/19"] = "holyday";
	calObject[cal_Id].day["2022/9/23"] = "holyday";
	
	calObject[cal_Id].day["2022/10/10"] = "holyday";
	
	calObject[cal_Id].day["2022/11/3"] = "holyday";
	calObject[cal_Id].day["2022/11/23"] = "holyday";
	
	calObject[cal_Id].day["2022/12/28"] = "holyday";
	calObject[cal_Id].day["2022/12/29"] = "holyday";
	calObject[cal_Id].day["2022/12/30"] = "holyday";
	calObject[cal_Id].day["2022/12/31"] = "holyday";
	
    calObject[cal_Id].day["2023/1/1"] = "holyday";
    calObject[cal_Id].day["2023/1/2"] = "holyday";
    calObject[cal_Id].day["2023/1/3"] = "holyday";
    calObject[cal_Id].day["2023/1/4"] = "holyday";
    
	calObject[cal_Id].day["2023/1/9"] = "holyday";


	calObject[cal_Id].day["2023/2/23"] = "holyday";
	
	calObject[cal_Id].day["2023/3/21"] = "holyday";
	
	calObject[cal_Id].day["2023/5/1"] = "holyday";
		calObject[cal_Id].day["2023/5/2"] = "holyday";
			calObject[cal_Id].day["2023/5/3"] = "holyday";
	calObject[cal_Id].day["2023/5/4"] = "holyday";
	calObject[cal_Id].day["2023/5/5"] = "holyday";
	
	calObject[cal_Id].day["2023/7/17"] = "holyday";

	calObject[cal_Id].day["2023/8/11"] = "holyday";
	calObject[cal_Id].day["2023/8/14"] = "holyday";
	calObject[cal_Id].day["2023/8/15"] = "holyday";
	calObject[cal_Id].day["2023/8/16"] = "holyday";

	calObject[cal_Id].day["2023/9/18"] = "holyday";

	calObject[cal_Id].day["2023/10/9"] = "holyday";

	calObject[cal_Id].day["2023/11/3"] = "holyday";
	calObject[cal_Id].day["2023/11/23"] = "holyday";

	calObject[cal_Id].day["2023/12/28"] = "holyday";
	calObject[cal_Id].day["2023/12/29"] = "holyday";

	calObject[cal_Id].day["2024/1/1"] = "holyday";
	calObject[cal_Id].day["2024/1/2"] = "holyday";
	calObject[cal_Id].day["2024/1/3"] = "holyday";
	calObject[cal_Id].day["2024/1/4"] = "holyday";
	calObject[cal_Id].day["2024/1/5"] = "holyday";
	calObject[cal_Id].day["2024/1/8"] = "holyday";
	
	calObject[cal_Id].day["2024/2/12"] = "holyday";
	calObject[cal_Id].day["2024/2/23"] = "holyday";
	
	calObject[cal_Id].day["2024/3/20"] = "holyday";
	
	calObject[cal_Id].day["2024/4/29"] = "holyday";
	
	calObject[cal_Id].day["2024/5/3"] = "holyday";
	calObject[cal_Id].day["2024/5/6"] = "holyday";
	
	calObject[cal_Id].day["2024/7/15"] = "holyday";
	
	calObject[cal_Id].day["2024/8/12"] = "holyday";
	calObject[cal_Id].day["2024/8/13"] = "holyday";
	calObject[cal_Id].day["2024/8/14"] = "holyday";
	calObject[cal_Id].day["2024/8/15"] = "holyday";
	calObject[cal_Id].day["2024/8/16"] = "holyday";
	
	calObject[cal_Id].day["2024/9/16"] = "holyday";
	calObject[cal_Id].day["2024/9/23"] = "holyday";
	
	calObject[cal_Id].day["2024/10/14"] = "holyday";
	
	calObject[cal_Id].day["2024/11/4"] = "holyday";
	
	calObject[cal_Id].day["2024/12/27"] = "holyday";
	calObject[cal_Id].day["2024/12/30"] = "holyday";
	calObject[cal_Id].day["2024/12/31"] = "holyday";


	calObject[cal_Id].day["2025/1/1"] = "holyday";
	calObject[cal_Id].day["2025/1/2"] = "holyday";
	calObject[cal_Id].day["2025/1/3"] = "holyday";
	calObject[cal_Id].day["2025/1/13"] = "holyday";
	
	
	
	calObject[cal_Id].day["2025/2/11"] = "holyday";
	calObject[cal_Id].day["2025/2/24"] = "holyday";
	calObject[cal_Id].day["2025/3/20"] = "holyday";
	calObject[cal_Id].day["2025/4/29"] = "holyday";
	
	calObject[cal_Id].day["2025/5/5"] = "holyday";
	calObject[cal_Id].day["2025/5/6"] = "holyday";
	
	calObject[cal_Id].day["2025/7/21"] = "holyday";
	
	calObject[cal_Id].day["2025/8/11"] = "holyday";
	calObject[cal_Id].day["2025/8/13"] = "holyday";
	calObject[cal_Id].day["2025/8/14"] = "holyday";
	calObject[cal_Id].day["2025/8/15"] = "holyday";
	
	calObject[cal_Id].day["2025/9/15"] = "holyday";
	calObject[cal_Id].day["2025/9/23"] = "holyday";
	
	calObject[cal_Id].day["2025/10/13"] = "holyday";
	
	calObject[cal_Id].day["2025/11/3"] = "holyday";
	calObject[cal_Id].day["2025/11/24"] = "holyday";
	
	calObject[cal_Id].day["2025/12/26"] = "holyday";
	calObject[cal_Id].day["2025/12/29"] = "holyday";
	calObject[cal_Id].day["2025/12/30"] = "holyday";
	calObject[cal_Id].day["2025/12/31"] = "holyday";
	
	calObject[cal_Id].day["2026/1/1"] = "holyday";
	calObject[cal_Id].day["2026/1/2"] = "holyday";
	calObject[cal_Id].day["2026/1/12"] = "holyday";
	calObject[cal_Id].day["2026/1/23"] = "holyday";
	
	
	
	
	
	calObject[cal_Id].day["2026/2/11"] = "holyday";
	calObject[cal_Id].day["2026/2/23"] = "holyday";
	
	calObject[cal_Id].day["2026/3/20"] = "holyday";
	
	calObject[cal_Id].day["2026/4/29"] = "holyday";
	
	calObject[cal_Id].day["2026/5/4"] = "holyday";
	calObject[cal_Id].day["2026/5/5"] = "holyday";
	calObject[cal_Id].day["2026/5/6"] = "holyday";
	
	calObject[cal_Id].day["2026/7/20"] = "holyday";
	
	calObject[cal_Id].day["2026/8/11"] = "holyday";
	calObject[cal_Id].day["2026/8/13"] = "holyday";
	calObject[cal_Id].day["2026/8/14"] = "holyday";
	calObject[cal_Id].day["2026/8/15"] = "holyday";
	
	calObject[cal_Id].day["2026/9/21"] = "holyday";
	calObject[cal_Id].day["2026/9/22"] = "holyday";
	calObject[cal_Id].day["2026/9/23"] = "holyday";
	
	calObject[cal_Id].day["2026/10/12"] = "holyday";
	
	calObject[cal_Id].day["2026/11/3"] = "holyday";
	calObject[cal_Id].day["2026/11/23"] = "holyday";
	
	calObject[cal_Id].day["2026/12/28"] = "holyday";
	calObject[cal_Id].day["2026/12/29"] = "holyday";
	calObject[cal_Id].day["2026/12/30"] = "holyday";
	calObject[cal_Id].day["2026/12/31"] = "holyday";
	
	calObject[cal_Id].day["2027/1/1"] = "holyday";
	calObject[cal_Id].day["2027/1/2"] = "holyday";
	calObject[cal_Id].day["2027/1/4"] = "holyday";
	calObject[cal_Id].day["2027/1/11"] = "holyday";
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	











	


	

	

	

	

	

	

	

	

	

	

	

	

	

	

	






















	

	//○日後

	calObject[cal_Id].after = new Array();



	

	//毎週○曜日の場合

	calObject[cal_Id].week = new Object();

	calObject[cal_Id].week["flag"] = 1;

	calObject[cal_Id].week["Sun"] = "Sun";

	calObject[cal_Id].week["Mon"];

	calObject[cal_Id].week["Tue"];

	calObject[cal_Id].week["Wed"];

	calObject[cal_Id].week["Thu"];

	calObject[cal_Id].week["Fri"];

	calObject[cal_Id].week["Sat"] = "Sat";

	

	//毎月○日の場合

	calObject[cal_Id].month = new Object();

	

	//カレンダーをクリックできるようにする場合

	calObject[cal_Id].click = new Object();

	////パラメータを送るURL

	calObject[cal_Id].click["url"];

	////クリック可能にするクラス名(クラス指定なしの場合は指定せず)

	calObject[cal_Id].click["day"];

	

	calObject[cal_Id].today = new Date();

	calObject[cal_Id].cal_year = calObject[cal_Id].today.getYear();

	calObject[cal_Id].cal_month = calObject[cal_Id].today.getMonth() + cal_display_month;

	calObject[cal_Id].cal_day = calObject[cal_Id].today.getDate();

	if(calObject[cal_Id].cal_year < 1900) calObject[cal_Id].cal_year += 1900;

	if(calObject[cal_Id].cal_month < 1){

		calObject[cal_Id].cal_month += 12;

		calObject[cal_Id].cal_year -= 1;

	}

	else if(calObject[cal_Id].cal_month > 12){

		calObject[cal_Id].cal_month -= 12;

		calObject[cal_Id].cal_year = calObject[cal_Id].cal_year + 1;

	}

	

	if(cal_display_month == 1){

		calObject[cal_Id].text[calObject[cal_Id].cal_year+"/"+calObject[cal_Id].cal_month+"/"+calObject[cal_Id].cal_day] = "Today";

		for(i=0;i<calObject[cal_Id].after.length;i++){

			if(calObject[cal_Id].after[i] != undefined){

				nmsec = i * 1000 * 60 * 60 * 24;

				msec  = (new Date()).getTime();

				dt    = new Date(nmsec+msec);

				month = dt.getMonth() + 1;

				date  = dt.getDate();

				year = dt.getYear();

				if(year < 1900) year += 1900;

				calObject[cal_Id].day[year+"/"+month+"/"+date] = calObject[cal_Id].after[i];

			}

		}

	}

	

	document.write("<div class='cal_wrapper'>");

	document.write("<ul class='cal_ui'>");

	document.write("<li class=\"cal_prev\" onclick=\"prevCal('"+cal_Id+"')\"></li>");

	document.write("<li class='cal_to' onclick=\"currentCal('"+cal_Id+"')\"></li>");

	document.write("<li class='cal_next' onclick=\"nextCal('"+cal_Id+"')\"></li>");

	document.write("</ul>");

	document.write("<div id='"+cal_Id+"' class='cal_base'></div>");

	document.write("</div>");

	

	calObject[cal_Id].to_year = calObject[cal_Id].cal_year;

	calObject[cal_Id].to_month = calObject[cal_Id].cal_month;

	calObject[cal_Id].to_day = calObject[cal_Id].cal_day;

	

	

	function currentCal(calObj){

		calObject[calObj].cal_year = calObject[calObj].to_year;

		calObject[calObj].cal_month = calObject[calObj].to_month;

		calObject[calObj].cal_day = calObject[calObj].to_day;

		writeCal(calObject[calObj].cal_year,calObject[calObj].cal_month,calObject[calObj].cal_day,calObj);

	}

	function prevCal(calObj){

		calObject[calObj].cal_month -= 1;

		if(calObject[calObj].cal_month < 1){

			calObject[calObj].cal_month = 12;

			calObject[calObj].cal_year -= 1;

		}

		writeCal(calObject[calObj].cal_year,calObject[calObj].cal_month,0,calObj);

	}

	function nextCal(calObj){

		calObject[calObj].cal_month += 1;

		if(calObject[calObj].cal_month > 12){

			calObject[calObj].cal_month = 1;

			calObject[calObj].cal_year += 1;

		}

		writeCal(calObject[calObj].cal_year,calObject[calObj].cal_month,0,calObj);

	}

	function getWeek(year,month,day){

		if (month == 1 || month == 2) {

			year--;

			month += 12;

		}

		var week = Math.floor(year + Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400) + Math.floor((13 * month + 8) / 5) + day) % 7;

		return week;

	}

	function writeCal(year,month,day,calObj){

		var calendars = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);

		var weeks = new Array("日","月","火","水","木","金","土");

		var monthName = new Array('','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月');

		

		var cal_flag = 0;

		if(year % 100 == 0 || year % 4 != 0){

			if(year % 400 != 0){

				cal_flag = 0;

			}

			else{

				cal_flag = 1;

			}

		}

		else if(year % 4 == 0){

			cal_flag = 1;

		}

		else{

			cal_flag = 0;

		}

		calendars[2] += cal_flag;

		

		var cal_start_day = getWeek(year,month,1);

		var cal_tags = "<p>" + year + "年" + monthName[month] + "</p>";

		cal_tags += "<ul class='cal_main'>";

		for(var i=0;i<weeks.length;i++){

			cal_tags += "<li class='cal_headline'><span>" + weeks[i] + "</span></li>";

		}

		for(var i=0;i < cal_start_day;i++){

			cal_tags += "<li><span>&nbsp;</span></li>";

		}

		

		//main

		var first_thu_flag = 1;

		var day_after = null;

		for(var cal_day_cnt = 1;cal_day_cnt <= calendars[month];cal_day_cnt++){

			var cal_day_match = year + "/" + month + "/" + cal_day_cnt;

			var dayClass = "";

			if(calObject[calObj].day[cal_day_match]){

				dayClass = ' class="'+calObject[calObj].day[cal_day_match]+'"';

			}

			else if(calObject[calObj].month[cal_day_cnt] != undefined){

				dayClass = ' class="'+calObject[calObj].month[cal_day_cnt]+'"';

			}

			else if(calObject[calObj].week["flag"] != undefined){

				if(cal_start_day == 0 && calObject[calObj].week["Sun"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Sun"]+'"';

				}

				else if(cal_start_day == 1 && calObject[calObj].week["Mon"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Mon"]+'"';

				}

				else if(cal_start_day == 2 && calObject[calObj].week["Tue"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Tue"]+'"';

				}

				else if(cal_start_day == 3 && calObject[calObj].week["Wed"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Wed"]+'"';

				}

				else if(cal_start_day == 4 && calObject[calObj].week["Thu"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Thu"]+'"';

				}

				else if(cal_start_day == 5 && calObject[calObj].week["Fri"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Fri"]+'"';

				}

				else if(cal_start_day == 6 && calObject[calObj].week["Sat"] != undefined){

					dayClass = ' class="'+calObject[calObj].week["Sat"]+'"';

				}

				else {

					dayClass = ' class="undefined"';

				}

			}

			else {

				dayClass = ' class="undefined"';

			}

			

			if(calObject[calObj].text[cal_day_match]){

				text_f = "<span class=\""+calObject[calObj].text[cal_day_match]+"\">";

				text_b = "</span>";

			}

			else {

				text_f = "<span>";

				text_b = "</span>";

			}

			

			//Click to Action

			var clickActions = "";

			if(calObject[calObj].click["day"] == calObject[calObj].day[cal_day_match] && calObject[calObj].click["url"] != undefined)

				clickActions = " onclick=\"location.href='"+calObject[calObj].click["url"]+cal_day_match+"'\"";

			

			cal_tags += "<li"+dayClass+clickActions+">" + text_f + cal_day_cnt + text_b + "</li>";

			if(cal_start_day == 6){

				cal_start_day = 0;

			}

			else{

				cal_start_day++;

			}

		}

		while(cal_start_day <= 6 && cal_start_day != 0){

			cal_tags += "<li><span>&nbsp;</span></li>";

			cal_start_day++;

		}

		cal_tags += "</ul>";

		document.getElementById(calObj).innerHTML = cal_tags;

	}

	writeCal(calObject[cal_Id].cal_year,calObject[cal_Id].cal_month,calObject[cal_Id].cal_day,cal_Id);

//-->