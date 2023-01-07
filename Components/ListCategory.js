import React from "react";
import { FlatList, Stack } from "native-base";
import BadgeCategory from "./BadgeCategory";

const ListCategory = ({ data }) => {
    return (
        <FlatList
            data={data ? data : null}
            extraData={data}
            renderItem={({ item }) => {
                return <BadgeCategory data={item} />;
            }}
            numColumns={3}
            keyExtractor={(item, index) => index}
        />
    );
};

export default ListCategory;
