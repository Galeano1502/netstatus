import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { api } from '../services/api';
import { styles } from '../styles/HomeScreen';

interface Modelo {
    id: string;
    name: string;
    groupName: string;
    algorithm: string;
}

export default function HomeScreen() {
    const router = useRouter();
    const [models, setModels] = useState<Modelo[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchModels() {
            try {
                const response = await api.get('/api/v1/models');
                if (isMounted) {
                    setModels(response.data.items);
                }
            } catch (error) {
                console.error("Erro ao buscar modelos:", error);
            }
        }

        void fetchModels();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* Banner com a Logo Oficial da Marca */}
            <View style={styles.brandHeader}>
                <Image
                    source={require('../../assets/images/netstatus-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Cabeçalho com o Ícone e Título */}
            <View style={styles.titleRow}>
                <Image
                    source={require('../../assets/images/netstatus-icon.png')}
                    style={styles.appIcon}
                    resizeMode="contain"
                />
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Monitor de Qualidade</Text>
                    <Text style={styles.subtitle}>
                        Selecione um modelo de inteligência abaixo para testar a sua conexão.
                    </Text>
                </View>
            </View>

            {models.map((modelo) => (
                <TouchableOpacity 
                    key={modelo.id} 
                    style={styles.card}
                    onPress={() => router.push({ pathname: '/forecast', params: { idDoModelo: modelo.id } })}
                >
                    {/* PARTE ESQUERDA: O Ícone */}
                    <View style={styles.cardIconContainer}>
                        <Feather name="cpu" size={24} color="#0B132B" />
                    </View>

                    {/* PARTE DO MEIO: Textos */}
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{modelo.name}</Text>
                        <Text style={styles.cardSubtitle}>{modelo.algorithm}</Text>
                    </View>

                    {/* PARTE DIREITA: A Seta de navegação */}
                    <Feather name="chevron-right" size={20} color="#CCC" />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}