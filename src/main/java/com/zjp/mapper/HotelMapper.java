package com.zjp.mapper;

import com.zjp.model.Commission;
import com.zjp.model.HotelScore;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hanguoan on 2019/3/23.
 */
public interface HotelMapper {
    List<HotelScore> getHotelScore();

    int countHotelScore();

//    int countCommissionScore(@Param(value = "sort") String sort,
//                             @Param(value = "amount") String amount,
//                             @Param(value = "num") String num);
//
//    List<Commission> getCommissionScore(@Param(value = "sort") String sort,
//                                        @Param(value = "amount") String amount,
//                                        @Param(value = "num") String num);

    int countCommissionScore(@Param(value = "sort") String sort,
                             @Param(value = "min1")int minosdm,
                             @Param(value = "max1") int maxosdm,
                             @Param(value = "min2") int minosdb,
                             @Param(value = "max2") int maxosdb);

    List<Commission> getCommissionScore(@Param(value = "sort") String sort,
                                        @Param(value = "min1")int minosdm,
                                        @Param(value = "max1") int maxosdm,
                                        @Param(value = "min2") int minosdb,
                                        @Param(value = "max2") int maxosdb);
}
