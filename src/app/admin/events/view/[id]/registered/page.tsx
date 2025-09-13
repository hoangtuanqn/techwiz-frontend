import React from "react";
import UserRegister from "./_components/UserRegister";

const ListUserRegister = async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;

    return <UserRegister id={id} />;
};

export default ListUserRegister;
