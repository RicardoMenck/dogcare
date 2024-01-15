package com.ricardo.dogcare.log;


import java.io.File;
import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class Log {



        public Logger logger;
        FileHandler fh;

        public Log(String log_dogcare) throws IOException {
            File arquivo = new File(log_dogcare);
            if (!arquivo.exists()) {
                arquivo.createNewFile();
            }


            fh = new FileHandler(log_dogcare, true);
            logger = Logger.getLogger("Teste Log");
            logger.addHandler(fh);
            SimpleFormatter formatter = new SimpleFormatter();
            fh.setFormatter(formatter);

        }

    }
