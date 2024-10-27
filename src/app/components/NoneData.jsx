import React from 'react'
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function NoneData() {
    return (
        <div className='nonedata'>
            <div className="nonedata-blok">
                <motion.div
                    className="loading-spinner"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5, // Более медленное вращение
                        ease: 'easeInOut', // Плавное ускорение и замедление
                    }}
                >
                    <AiOutlineLoading3Quarters size={40} />
                </motion.div>
                Loading
            </div>
        </div>
    )
};