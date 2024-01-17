import React, {useContext, useEffect, useState} from "react";
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText,} from "@mui/material";
import {
    Assignment as AssignmentIcon,
    Create as CreateIcon,
    Home as HomeIcon,
    List as ListIcon,
    Queue as QueueIcon,
    Refresh as RefreshIcon,
    Settings as SettingsIcon,
    Work as WorkIcon,
} from "@mui/icons-material";
import {QueueContext} from "../queueSystemFiles/QueueContext";
import Link from "next/link";
import {useSession} from "next-auth/react";
import axios from "axios";

const Sidebar = () => {
    const [selectedTab, setSelectedTab] = useState("");
    const { queueEnabled } = useContext(QueueContext);
    const { data: session } = useSession();

    const [userData, setUserData] = useState({});
    const [sessionChecked, setSessionChecked] = useState(false);
    useEffect(() => {
        if (session && !sessionChecked) {
            axios
                .get(`http://localhost:8080/user/uid?uid=${session.user.name}`)
                .then((response) => {
                    setUserData(response.data);
                });
            setSessionChecked(true);
        }
    }, [session, sessionChecked]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: "240px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "240px",
                    boxSizing: "border-box",
                    backgroundColor: "#121212",
                    color: "#FFF",
                    backdropFilter: "blur(8px)",
                    zIndex: 1,
                    overflow: "hidden",
                    transform: "scale(1)",
                    transformOrigin: "top left",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    marginTop: "20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "140px",
                        padding: "0 16px",
                        backgroundColor: "#121212",
                    }}
                >
                    <img
                        src={"/appLogo.png"}
                        alt="Logo"
                        style={{ width: "80%", height: "auto", objectFit: "contain" }}
                    />
                </Box>

                <List sx={{ flexGrow: 1, paddingTop: "16px" }}>
                    <ListItem
                        button
                        component={Link}
                        href="/"
                        selected={selectedTab === "/"}
                        onClick={() => handleTabClick("/")}
                        sx={{
                            color: "#FFF",
                            backgroundColor: selectedTab === "/" ? "#1976d2" : "transparent",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "#FFF" }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Strona główna"
                            primaryTypographyProps={{ sx: { textAlign: "center" } }}
                        />
                    </ListItem>

                    {session && userData.accountRole === "ADMIN" && (
                        <ListItem
                            button
                            component={Link}
                            href="/jobOffers"
                            selected={selectedTab === "/jobOffers"}
                            onClick={() => handleTabClick("/jobOffers")}
                            sx={{
                                color: "#FFF",
                                backgroundColor:
                                    selectedTab === "/jobOffers" ? "#1976d2" : "transparent",
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "#FFF" }}>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Stwórz ogłoszenie"
                                primaryTypographyProps={{ sx: { textAlign: "center" } }}
                            />
                        </ListItem>
                    )}

                    <ListItem
                        button
                        component={Link}
                        href="/jobOffersList"
                        selected={selectedTab === "/jobOffersList"}
                        onClick={() => handleTabClick("/jobOffersList")}
                        sx={{
                            color: "#FFF",
                            backgroundColor:
                                selectedTab === "/jobOffersList" ? "#1976d2" : "transparent",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "#FFF" }}>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Oferty pracy"
                            primaryTypographyProps={{ sx: { textAlign: "center" } }}
                        />
                    </ListItem>

                    {session && (
                        <ListItem
                            button
                            component={Link}
                            href="/applicationsList"
                            selected={selectedTab === "/applicationsList"}
                            onClick={() => handleTabClick("/applicationsList")}
                            sx={{
                                color: "#FFF",
                                backgroundColor:
                                    selectedTab === "/applicationsList"
                                        ? "#1976d2"
                                        : "transparent",
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "#FFF" }}>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Przeglądaj aplikacje"
                                primaryTypographyProps={{ sx: { textAlign: "center" } }}
                            />
                        </ListItem>
                    )}

                    {session && userData.accountRole === "ADMIN" && (
                        <ListItem
                            button
                            component={Link}
                            href="/createTicket"
                            selected={selectedTab === "/createTicket"}
                            onClick={() => handleTabClick("/createTicket")}
                            sx={{
                                color: "#FFF",
                                backgroundColor:
                                    selectedTab === "/createTicket" ? "#1976d2" : "transparent",
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "#FFF" }}>
                                <CreateIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Stwórz bilet"
                                primaryTypographyProps={{ sx: { textAlign: "center" } }}
                            />
                        </ListItem>
                    )}
                    {queueEnabled && session ? (
                        <>
                            <ListItem
                                button
                                component={Link}
                                href="/queue"
                                selected={selectedTab === "/queue"}
                                onClick={() => handleTabClick("/queue")}
                                sx={{
                                    color: "#FFF",
                                    backgroundColor:
                                        selectedTab === "/queue" ? "#1976d2" : "transparent",
                                    "&:hover": {
                                        backgroundColor: "#1976d2",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "#FFF" }}>
                                    <QueueIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Kolejka"
                                    primaryTypographyProps={{ sx: { textAlign: "center" } }}
                                />
                            </ListItem>
                        </>
                    ) : (
                        <ListItem
                            sx={{
                                color: "#CCC",
                                backgroundColor: "transparent",
                                pointerEvents: "none",
                            }}
                        >
                            <ListItemIcon sx={{ color: "#CCC" }}>
                                <QueueIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Kolejka (wyłączona)"
                                primaryTypographyProps={{ sx: { textAlign: "center" } }}
                            />
                        </ListItem>
                    )}
                    {session && userData.accountRole === "ADMIN" && (
                        <ListItem
                            button
                            component={Link}
                            href="/queueManagement"
                            selected={selectedTab === "/queueManagement"}
                            onClick={() => (window.location.href = "/queueManagement")}
                            sx={{
                                color: "#FFF",
                                backgroundColor:
                                    selectedTab === "/queueManagement"
                                        ? "#1976d2"
                                        : "transparent",
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "#FFF" }}>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Zarządzanie kolejką"
                                primaryTypographyProps={{ sx: { textAlign: "center" } }}
                            />
                        </ListItem>
                    )}
                    {/* Dodajemy ikonkę odświeżania strony */}
                    <ListItem
                        button
                        onClick={() => window.location.reload()}
                        sx={{
                            color: "#FFF",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "#FFF" }}>
                            <RefreshIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary=""
                            primaryTypographyProps={{ sx: { textAlign: "center" } }}
                        />
                    </ListItem>
                    {/* Koniec ikonki odświeżania strony */}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
